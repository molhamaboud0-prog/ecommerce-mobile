import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image, type ImageProps } from 'expo-image';
import { cssInterop } from 'nativewind';

cssInterop(Image, { className: 'style' });

const PLACEHOLDER = { blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' };

type AppImageProps = ImageProps & {
  /** Soft fill shown while the remote image loads or fails. */
  fallbackColor?: string;
};

export function AppImage({
  source,
  style,
  className,
  recyclingKey,
  fallbackColor = '#E8EEF5',
  onLoad,
  onError,
  ...rest
}: AppImageProps) {
  const [failed, setFailed] = useState(false);
  const uri =
    source && typeof source === 'object' && !Array.isArray(source) && 'uri' in source
      ? source.uri
      : undefined;

  return (
    <View
      className={className}
      style={[{ backgroundColor: fallbackColor, overflow: 'hidden' }, style]}
    >
      {!failed ? (
        <Image
          {...rest}
          source={source}
          style={StyleSheet.absoluteFillObject}
          cachePolicy="memory-disk"
          transition={200}
          placeholder={PLACEHOLDER}
          recyclingKey={recyclingKey ?? (typeof uri === 'string' ? uri : undefined)}
          onLoad={(e) => {
            setFailed(false);
            onLoad?.(e);
          }}
          onError={(e) => {
            setFailed(true);
            onError?.(e);
          }}
        />
      ) : null}
    </View>
  );
}
