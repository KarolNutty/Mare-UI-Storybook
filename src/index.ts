/**
 * Maré UI — ponto de entrada único.
 * Os estilos vêm junto: quem importa o pacote não precisa lembrar de importar CSS.
 */
import './styles/tokens.css';
import './styles/utilities.css';

export { ThemeProvider } from './components/ThemeProvider';
export type { ThemeProviderProps } from './components/ThemeProvider';

export { Button } from './components/Button';
export type { ButtonProps, ButtonVariant, ButtonSize } from './components/Button';

export { Spinner } from './components/Spinner';
export type { SpinnerProps } from './components/Spinner';

export { Field } from './components/Field';
export type { FieldProps, FieldRenderProps } from './components/Field';

export { Input } from './components/Input';
export type { InputProps } from './components/Input';

export { Textarea } from './components/Textarea';
export type { TextareaProps } from './components/Textarea';

export { Select } from './components/Select';
export type { SelectProps, SelectOption } from './components/Select';

export { Checkbox } from './components/Checkbox';
export type { CheckboxProps } from './components/Checkbox';

export { Switch } from './components/Switch';
export type { SwitchProps } from './components/Switch';

export { Badge } from './components/Badge';
export type { BadgeProps, BadgeTone } from './components/Badge';

export { Avatar, AvatarGroup, getInitials } from './components/Avatar';
export type { AvatarProps, AvatarGroupProps, AvatarSize } from './components/Avatar';

export { Card, CardHeader, CardBody, CardFooter } from './components/Card';
export type { CardProps, CardHeaderProps, CardFooterProps } from './components/Card';

export { Alert } from './components/Alert';
export type { AlertProps, AlertTone } from './components/Alert';

export { Modal } from './components/Modal';
export type { ModalProps } from './components/Modal';

export { Tabs } from './components/Tabs';
export type { TabsProps, TabItem } from './components/Tabs';

export { Tooltip } from './components/Tooltip';
export type { TooltipProps } from './components/Tooltip';

export {
  useTheme,
  useControllableState,
  useFocusTrap,
  useScrollLock,
  useIsomorphicLayoutEffect,
} from './hooks';
export type { Theme, ThemeContextValue, UseControllableStateOptions } from './hooks';

export { cn } from './lib/cn';
export type { ClassValue } from './lib/cn';
