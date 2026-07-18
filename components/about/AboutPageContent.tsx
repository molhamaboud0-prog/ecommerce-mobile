import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import {
  Award,
  Headphones,
  Shield,
  Sparkles,
  Truck,
  type LucideIcon,
} from 'lucide-react-native';
import { View } from 'react-native';

import { Text } from '@/components/ui/AppText';
import { Button } from '@/components/ui';
import { aboutContent } from '@/data/about';
import type { AboutValueIcon } from '@/data/types';
import { useAppTranslation } from '@/hooks/useLocalized';
import { useThemeColors } from '@/hooks/useThemeColors';
import { shadowCard } from '@/lib/theme';

const VALUE_ICONS: Record<AboutValueIcon, LucideIcon> = {
  award: Award,
  truck: Truck,
  shield: Shield,
  headphones: Headphones,
};

function AboutHero({ isRTL }: { isRTL: boolean }) {
  const title = isRTL ? aboutContent.titleAr : aboutContent.title;
  const tagline = isRTL ? aboutContent.taglineAr : aboutContent.tagline;
  const since = isRTL ? aboutContent.sinceAr : aboutContent.since;

  return (
    <View className="mb-5 overflow-hidden rounded-3xl" style={shadowCard}>
      <LinearGradient
        colors={['#1A1A2E', '#3D2C5A', '#E94560']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1.1, y: 1.1 }}
        style={{ padding: 28 }}
      >
        <View
          className={`mb-4 self-start rounded-full bg-white/15 px-3 py-1 ${isRTL ? 'self-end' : ''}`}
        >
          <Text className="text-xs font-semibold text-white/90">{since}</Text>
        </View>
        <View className={`flex-row items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <View className="mr-0 h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <Sparkles size={24} color="#FFFFFF" />
          </View>
          <View className={`flex-1 ${isRTL ? 'mr-3 items-end' : 'ml-3'}`}>
            <Text
              className={`text-2xl font-bold text-white ${isRTL ? 'text-right' : ''}`}
            >
              {title}
            </Text>
            <Text className={`mt-1 text-sm text-white/80 ${isRTL ? 'text-right' : ''}`}>
              {tagline}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

function AboutStats({ isRTL }: { isRTL: boolean }) {
  return (
    <View className="mb-5 flex-row flex-wrap" style={{ gap: 12 }}>
      {aboutContent.stats.map((stat) => (
        <View
          key={stat.label}
          className="min-w-[46%] flex-1 items-center rounded-2xl bg-surface p-4"
          style={shadowCard}
        >
          <Text className="text-2xl font-bold text-accent">{stat.value}</Text>
          <Text
            className={`mt-1 text-center text-xs text-muted ${isRTL ? 'text-right' : ''}`}
          >
            {isRTL ? stat.labelAr : stat.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

function AboutMission({ isRTL }: { isRTL: boolean }) {
  const { t } = useAppTranslation();
  const mission = isRTL ? aboutContent.missionAr : aboutContent.mission;

  return (
    <View className="border-accent/20 mb-5 rounded-3xl border bg-accent-soft p-5">
      <Text className="text-xs font-semibold uppercase tracking-wide text-accent">
        {t('common.aboutOurMission')}
      </Text>
      <Text className={`mt-2 text-base leading-7 text-ink ${isRTL ? 'text-right' : ''}`}>
        "{mission}"
      </Text>
    </View>
  );
}

function AboutValues({ isRTL }: { isRTL: boolean }) {
  const { t } = useAppTranslation();
  const c = useThemeColors();

  return (
    <View className="mb-5">
      <Text className={`mb-3 text-lg font-bold text-ink ${isRTL ? 'text-right' : ''}`}>
        {t('common.aboutWhyUs')}
      </Text>
      {aboutContent.values.map((value) => {
        const Icon = VALUE_ICONS[value.icon];
        const title = isRTL ? value.titleAr : value.title;
        const description = isRTL ? value.descriptionAr : value.description;

        return (
          <View
            key={value.icon}
            className={`mb-3 flex-row rounded-2xl bg-surface p-4 ${isRTL ? 'flex-row-reverse' : ''}`}
            style={shadowCard}
          >
            <View className="h-12 w-12 items-center justify-center rounded-xl bg-accent-soft">
              <Icon size={22} color={c.accent} />
            </View>
            <View className={`flex-1 ${isRTL ? 'mr-3 items-end' : 'ml-3'}`}>
              <Text className={`font-semibold text-ink ${isRTL ? 'text-right' : ''}`}>
                {title}
              </Text>
              <Text
                className={`mt-1 text-sm leading-5 text-muted ${isRTL ? 'text-right' : ''}`}
              >
                {description}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

function AboutStory({ isRTL }: { isRTL: boolean }) {
  const { t } = useAppTranslation();
  const paragraphs = isRTL ? aboutContent.paragraphsAr : aboutContent.paragraphs;

  return (
    <View className="mb-6 rounded-3xl bg-surface p-5" style={shadowCard}>
      <Text className={`mb-3 text-lg font-bold text-ink ${isRTL ? 'text-right' : ''}`}>
        {t('common.aboutOurStory')}
      </Text>
      {paragraphs.map((p) => (
        <Text
          key={p.slice(0, 24)}
          className={`mb-3 text-base leading-7 text-muted last:mb-0 ${isRTL ? 'text-right' : ''}`}
        >
          {p}
        </Text>
      ))}
    </View>
  );
}

function AboutCta() {
  const { t } = useAppTranslation();

  return (
    <View className="mb-4 gap-3">
      <Button
        title={t('common.aboutShopCta')}
        onPress={() => router.replace('/(drawer)/(tabs)/categories')}
      />
      <Button
        title={t('common.aboutContactCta')}
        variant="ghost"
        onPress={() => router.replace('/(drawer)/contact')}
      />
    </View>
  );
}

export function AboutPageContent() {
  const { isRTL } = useAppTranslation();

  return (
    <>
      <AboutHero isRTL={isRTL} />
      <AboutStats isRTL={isRTL} />
      <AboutMission isRTL={isRTL} />
      <AboutValues isRTL={isRTL} />
      <AboutStory isRTL={isRTL} />
      <AboutCta />
    </>
  );
}
