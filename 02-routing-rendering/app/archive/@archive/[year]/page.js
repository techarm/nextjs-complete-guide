import NewsList from '@/components/news-list';
import { getNewsForYear } from '@/lib/news';

export default async function FilteredNewsPage({ params }) {
  const { year } = await params;
  const news = getNewsForYear(year);

  return <NewsList news={news} />;
}
