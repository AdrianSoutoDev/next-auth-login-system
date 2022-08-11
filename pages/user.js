import Layout from '../components/Layout'
import { useLocale } from '../hooks/useLocale';

export default function User() {
  const locale = useLocale();
  return (
    <Layout>
          <h1>{locale.HelloUser}</h1>
    </Layout>
  )
}