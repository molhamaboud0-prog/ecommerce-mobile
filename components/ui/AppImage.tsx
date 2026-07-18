import { Image, type ImageProps } from 'expo-image';
import { cssInterop } from 'nativewind';

cssInterop(Image, { className: 'style' });

export function AppImage(props: ImageProps) {
  return <Image cachePolicy="memory-disk" transition={200} {...props} />;
}
