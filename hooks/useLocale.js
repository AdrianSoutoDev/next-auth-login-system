import { useRouter } from 'next/router';
import i18n from '../i18n/i18n'

export function useLocale(){
    const { locale } = useRouter();
    return i18n[locale]
}