type Props = {
  children: React.ReactNode;
}

export default function ScreenReaderOnly({ children }: Props) {
  return <span style={styles.hide}>{children}</span>;
}

const styles = {
  hide: {
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute' as const,
    whiteSpace: 'nowrap' as const,
    width: 1,
  },
};
