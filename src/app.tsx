import { Panel } from './components/Panel';
import { useSettings } from './hooks/useSettings';

export function App() {
  useSettings();

  return (
    <>
      <Panel />
    </>
  );
}
