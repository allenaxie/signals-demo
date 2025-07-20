import { createMockLocalStorage } from 'src/app/shared/utils/mock-localstorage.utils';
import { SettingsStore, Theme, Language } from './settings.store';

describe('SettingsStore (with mocked localStorage)', () => {
  let store: SettingsStore;
  let mockStorage: ReturnType<typeof createMockLocalStorage>;

  beforeEach(() => {
    mockStorage = createMockLocalStorage();

    // Replace global localStorage methods with the mock
    spyOn(localStorage, 'getItem').and.callFake(mockStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockStorage.clear);

    localStorage.clear(); // from the mock
    store = new SettingsStore();
  });

  it('should initialize with default values', () => {
    expect(store.currentTheme()).toBe('light');
    expect(store.currentLanguage()).toBe('en');
  });

  it('should load theme and language from localStorage if available', () => {
    mockStorage.setItem('theme', JSON.stringify('dark'));
    mockStorage.setItem('language', JSON.stringify('es'));

    const restored = new SettingsStore();
    expect(restored.currentTheme()).toBe('dark');
    expect(restored.currentLanguage()).toBe('es');
  });

  it('should toggle theme correctly', () => {
    store.toggleTheme();
    expect(store.currentTheme()).toBe('dark');
    store.toggleTheme();
    expect(store.currentTheme()).toBe('light');
  });

  it('should allow setting theme directly', () => {
    store.setTheme('dark');
    expect(store.currentTheme()).toBe('dark');
  });

  it('should allow setting language directly', () => {
    store.setLanguage('cn');
    expect(store.currentLanguage()).toBe('cn');
  });

  it('should persist theme to localStorage on change', () => {
    store.setTheme('dark');
    const saved = JSON.parse(mockStorage.getItem('theme')!);
    expect(saved).toBe('dark');
  });

  it('should persist language to localStorage on change', () => {
    store.setLanguage('cn');
    const saved = JSON.parse(mockStorage.getItem('language')!);
    expect(saved).toBe('cn');
  });
});
