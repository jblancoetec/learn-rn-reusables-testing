import { View } from 'react-native';
import { type ErrorBoundaryProps } from 'expo-router';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { THEME } from '@/lib/theme';

export function FeedbackFrenteAErrores({ error, retry }: ErrorBoundaryProps) {
  const { colorScheme } = useColorScheme();
  const bgColor = THEME[colorScheme ?? 'light']['background'];
  const borderColor = THEME[colorScheme ?? 'light']['border'];

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Alert className={`bg-[${bgColor}] border-[${borderColor}]`} variant="destructive" icon={AlertCircleIcon}>
        <AlertTitle>Oooops!!!</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    </View>
  );
}

