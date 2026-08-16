import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import styles from './Avatar.module.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  src?: string;
  /** Nome da pessoa. Gera as iniciais e o texto alternativo. */
  name?: string;
  size?: AvatarSize;
  square?: boolean;
  /** Conteúdo próprio no lugar das iniciais (um ícone, por exemplo). */
  fallback?: ReactNode;
}

/** Pega no máximo duas iniciais, ignorando conectivos ("Ana da Silva" -> "AS"). */
export function getInitials(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter((part) => part.length > 2 || /^[A-ZÀ-Ý]/.test(part));

  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();

  return (parts[0]![0]! + parts[parts.length - 1]![0]!).toUpperCase();
}

export function Avatar({
  src,
  name,
  size = 'md',
  square = false,
  fallback,
  className,
  ...rest
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <span
      {...rest}
      className={cn(styles.avatar, styles[size], square && styles.square, className)}
      title={rest.title ?? name}
    >
      {showImage ? (
        <img
          className={styles.image}
          src={src}
          alt={name ?? ''}
          onError={() => setFailed(true)}
          loading="lazy"
        />
      ) : (
        // Iniciais são decoração: quem lê tela recebe o nome pelo aria-label.
        <span aria-label={name} role={name ? 'img' : undefined}>
          <span aria-hidden="true">{fallback ?? (name ? getInitials(name) : '?')}</span>
        </span>
      )}
    </span>
  );
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** Empilha avatares com sobreposição. Bom para "quem está nesta conversa". */
export function AvatarGroup({ className, children, ...rest }: AvatarGroupProps) {
  return (
    <div {...rest} className={cn(styles.group, className)}>
      {children}
    </div>
  );
}
