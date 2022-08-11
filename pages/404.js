import Layout from '../components/Layout'
import { useLocale } from '../hooks/useLocale';

export default function FourOfour() {
  const locale = useLocale();
  return (
    <Layout>
          <h1>{locale._404}</h1>
    </Layout>
  )
}