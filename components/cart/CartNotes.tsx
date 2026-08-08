import { Input } from '@/components/ui';
import { useAppTranslation } from '@/hooks/useLocalized';
import { useCartStore } from '@/store/cartStore';

export function CartNotes() {
  const { t } = useAppTranslation();
  const notes = useCartStore((s) => s.notes);
  const setNotes = useCartStore((s) => s.setNotes);

  return (
    <Input
      label={t('common.orderNotes')}
      placeholder={t('common.orderNotesPlaceholder')}
      value={notes}
      onChangeText={setNotes}
      multiline
      numberOfLines={4}
      textAlignVertical="top"
      className="py-3"
      style={{ minHeight: 96 }}
    />
  );
}
