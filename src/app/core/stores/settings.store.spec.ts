import { TestBed } from '@angular/core/testing';
import { SettingsStore } from './settings.store';
import { createMockLocalStorage } from 'src/app/shared/utils/mock-localstorage.utils';

describe('SettingsStore persistence (round-trip)', () => {
  let mockStorage = createMockLocalStorage();
  const realLocalStorage = window.localStorage;

  beforeEach(() => {
    //!! If we create new mockStorage here, persistence will not work for some reason
    // Override the browser global before each spec
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
      configurable: true,
    });
    TestBed.configureTestingModule({
      providers: [SettingsStore],
    });
  });

  afterEach(() => {
    // Restore real storage
    Object.defineProperty(window, 'localStorage', {
      value: realLocalStorage,
      configurable: true,
    });
    // Reset mockStorage here instead of beforeEach
    mockStorage = createMockLocalStorage();
  });

  it('should initialize with default values', () => {
    TestBed.configureTestingModule({ providers: [SettingsStore] });
    const store = TestBed.inject(SettingsStore);
    expect(store.currentTheme()).toBe('light');
    expect(store.currentLanguage()).toBe('en');
  });

  it('should load theme and language from localStorage if available', () => {
    // Pre-seed the mock before constructing the store
    mockStorage.setItem('theme', JSON.stringify('dark'));
    mockStorage.setItem('language', JSON.stringify('es'));

    TestBed.configureTestingModule({ providers: [SettingsStore] });
    const store = TestBed.inject(SettingsStore);
    expect(store.currentTheme()).toBe('dark');
    expect(store.currentLanguage()).toBe('es');
  });

  it('should toggle theme correctly', () => {
    TestBed.configureTestingModule({ providers: [SettingsStore] });
    const store = TestBed.inject(SettingsStore);

    store.toggleTheme();
    expect(store.currentTheme()).toBe('dark');

    store.toggleTheme();
    expect(store.currentTheme()).toBe('light');
  });

  it('should allow setting theme directly', () => {
    TestBed.configureTestingModule({ providers: [SettingsStore] });
    const store = TestBed.inject(SettingsStore);

    store.setTheme('dark');
    expect(store.currentTheme()).toBe('dark');
  });

  it('should allow setting language directly', () => {
    TestBed.configureTestingModule({ providers: [SettingsStore] });
    const store = TestBed.inject(SettingsStore);

    store.setLanguage('cn');
    expect(store.currentLanguage()).toBe('cn');
  });

  it('should persist theme so new store instance loads it', (done) => {
    const store = TestBed.inject(SettingsStore);
    store.setTheme('dark');

    // give Angular’s effect() a chance
    setTimeout(() => {
      // New instance reads from mockStorage
      const reloaded = TestBed.inject(SettingsStore);
      expect(reloaded.currentTheme()).toBe('dark');
      done();
    }, 0);
  });

  it('should persist language so new store instance loads it', (done) => {
    const store = TestBed.inject(SettingsStore);
    store.setLanguage('es');

    setTimeout(() => {
      const reloaded = TestBed.inject(SettingsStore);
      expect(reloaded.currentLanguage()).toBe('es');
      done();
    }, 0);
  });
});
