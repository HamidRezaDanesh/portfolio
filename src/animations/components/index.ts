// src/animations/components/index.ts
// 📦 Export همه چیز از یک جا

// Components (از همین پوشه)
export { 
  AnimatedSection, 
  AnimatedStagger, 
  AnimatedStaggerItem 
} from './AnimatedSection';

export { 
  AnimatedCard, 
  SubtleCard, 
  StrongCard 
} from './AnimatedCard';

export { 
  NumberCounter,
  PercentageCounter,
  CurrencyCounter,
  YearsCounter,
} from './NumberCounter';

export { 
  RippleButton,
  PrimaryRippleButton,
  SecondaryRippleButton,
  OutlineRippleButton,
} from './RippleButton';

// Hooks (یک پوشه بالاتر، بعد hooks)
export { 
  useScrollAnimation, 
  useScrollAnimationCallback,
  useStaggeredAnimation,
} from '../hooks/useScrollAnimation';

export { 
  useCounter, 
  counterPresets 
} from '../hooks/useCounter';

export { 
  useRipple, 
  useCenterRipple 
} from '../hooks/useRipple';

// Variants (یک پوشه بالاتر، بعد config)
export * from '../config/variants';