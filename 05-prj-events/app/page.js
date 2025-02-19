import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/error-alert';

export default function Home() {
  return (
    <div>
      <Button>Click me!</Button>
      <ErrorAlert>An error occurred!</ErrorAlert>
    </div>
  );
}
