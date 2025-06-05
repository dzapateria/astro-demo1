// Context7 - Advanced Context Management System
// A lightweight state management solution for Astro applications

export interface Context7State {
  theme: 'dark' | 'light';
  user: User | null;
  favorites: string[];
  currentSection: string;
  isLoading: boolean;
  notifications: Notification[];
  preferences: UserPreferences;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  subscription: 'free' | 'premium' | 'family';
  watchHistory: WatchHistoryItem[];
}

export interface WatchHistoryItem {
  id: string;
  title: string;
  type: 'movie' | 'series' | 'documentary';
  progress: number; // 0-100
  lastWatched: Date;
  thumbnail: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface UserPreferences {
  language: string;
  autoplay: boolean;
  quality: 'auto' | '720p' | '1080p' | '4k';
  subtitles: boolean;
  notifications: boolean;
  parentalControls: boolean;
}

// Default state
const defaultState: Context7State = {
  theme: 'dark',
  user: null,
  favorites: [],
  currentSection: 'home',
  isLoading: false,
  notifications: [],
  preferences: {
    language: 'es',
    autoplay: true,
    quality: 'auto',
    subtitles: false,
    notifications: true,
    parentalControls: false,
  },
};

// Context7 Class
class Context7Manager {
  private state: Context7State;
  private listeners: Array<(state: Context7State) => void> = [];
  private storageKey = 'context7-state';

  constructor() {
    this.state = this.loadFromStorage() || { ...defaultState };
    this.initializeEventListeners();
  }

  // Get current state
  getState(): Context7State {
    return { ...this.state };
  }

  // Update state
  setState(updates: Partial<Context7State>): void {
    const previousState = { ...this.state };
    this.state = { ...this.state, ...updates };
    
    // Save to localStorage
    this.saveToStorage();
    
    // Notify listeners
    this.notifyListeners(previousState);
    
    // Dispatch custom event
    this.dispatchStateChange(previousState, this.state);
  }

  // Subscribe to state changes
  subscribe(callback: (state: Context7State) => void): () => void {
    this.listeners.push(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  // User management
  setUser(user: User): void {
    this.setState({ user });
  }

  logout(): void {
    this.setState({ 
      user: null, 
      favorites: [], 
      notifications: [] 
    });
  }

  // Favorites management
  addToFavorites(itemId: string): void {
    if (!this.state.favorites.includes(itemId)) {
      this.setState({
        favorites: [...this.state.favorites, itemId]
      });
      
      this.addNotification({
        type: 'success',
        title: 'Agregado a favoritos',
        message: 'El contenido se agregó a tu lista de favoritos',
      });
    }
  }

  removeFromFavorites(itemId: string): void {
    this.setState({
      favorites: this.state.favorites.filter(id => id !== itemId)
    });
  }

  isFavorite(itemId: string): boolean {
    return this.state.favorites.includes(itemId);
  }

  // Notifications management
  addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): void {
    const newNotification: Notification = {
      ...notification,
      id: this.generateId(),
      timestamp: new Date(),
      read: false,
    };

    this.setState({
      notifications: [newNotification, ...this.state.notifications].slice(0, 50) // Keep only last 50
    });
  }

  markNotificationAsRead(notificationId: string): void {
    this.setState({
      notifications: this.state.notifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    });
  }

  clearNotifications(): void {
    this.setState({ notifications: [] });
  }

  // Watch history management
  addToWatchHistory(item: Omit<WatchHistoryItem, 'lastWatched'>): void {
    if (!this.state.user) return;

    const historyItem: WatchHistoryItem = {
      ...item,
      lastWatched: new Date(),
    };

    const updatedUser: User = {
      ...this.state.user,
      watchHistory: [
        historyItem,
        ...this.state.user.watchHistory.filter(h => h.id !== item.id)
      ].slice(0, 100) // Keep only last 100 items
    };

    this.setState({ user: updatedUser });
  }

  // Preferences management
  updatePreferences(preferences: Partial<UserPreferences>): void {
    this.setState({
      preferences: { ...this.state.preferences, ...preferences }
    });
  }

  // Theme management
  toggleTheme(): void {
    const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
    this.setState({ theme: newTheme });
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  // Loading state management
  setLoading(isLoading: boolean): void {
    this.setState({ isLoading });
  }

  // Private methods
  private loadFromStorage(): Context7State | null {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.warn('Failed to load Context7 state from storage:', error);
      return null;
    }
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    } catch (error) {
      console.warn('Failed to save Context7 state to storage:', error);
    }
  }

  private notifyListeners(previousState: Context7State): void {
    this.listeners.forEach(callback => {
      try {
        callback(this.state);
      } catch (error) {
        console.error('Error in Context7 listener:', error);
      }
    });
  }

  private dispatchStateChange(previousState: Context7State, newState: Context7State): void {
    const event = new CustomEvent('context7:statechange', {
      detail: { previousState, newState }
    });
    window.dispatchEvent(event);
  }

  private initializeEventListeners(): void {
    // Listen for storage changes from other tabs
    window.addEventListener('storage', (event) => {
      if (event.key === this.storageKey && event.newValue) {
        try {
          this.state = JSON.parse(event.newValue);
          this.notifyListeners(this.state);
        } catch (error) {
          console.error('Failed to sync Context7 state from storage:', error);
        }
      }
    });

    // Apply initial theme
    document.documentElement.setAttribute('data-theme', this.state.theme);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

// Create singleton instance
let context7Instance: Context7Manager | null = null;

export function getContext7(): Context7Manager {
  if (!context7Instance) {
    context7Instance = new Context7Manager();
  }
  return context7Instance;
}

// Hook for easy usage in components
export function useContext7() {
  const context7 = getContext7();
  
  return {
    state: context7.getState(),
    setState: (updates: Partial<Context7State>) => context7.setState(updates),
    subscribe: (callback: (state: Context7State) => void) => context7.subscribe(callback),
    
    // User methods
    setUser: (user: User) => context7.setUser(user),
    logout: () => context7.logout(),
    
    // Favorites methods
    addToFavorites: (itemId: string) => context7.addToFavorites(itemId),
    removeFromFavorites: (itemId: string) => context7.removeFromFavorites(itemId),
    isFavorite: (itemId: string) => context7.isFavorite(itemId),
    
    // Notifications methods
    addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => 
      context7.addNotification(notification),
    markNotificationAsRead: (id: string) => context7.markNotificationAsRead(id),
    clearNotifications: () => context7.clearNotifications(),
    
    // Watch history methods
    addToWatchHistory: (item: Omit<WatchHistoryItem, 'lastWatched'>) => 
      context7.addToWatchHistory(item),
    
    // Preferences methods
    updatePreferences: (preferences: Partial<UserPreferences>) => 
      context7.updatePreferences(preferences),
    
    // Theme methods
    toggleTheme: () => context7.toggleTheme(),
    
    // Loading methods
    setLoading: (isLoading: boolean) => context7.setLoading(isLoading),
  };
}

// Export types for external use
export type { Context7Manager };

// Initialize Context7 when module is imported
if (typeof window !== 'undefined') {
  // Make Context7 available globally for backward compatibility
  (window as any).Context7 = getContext7();
}