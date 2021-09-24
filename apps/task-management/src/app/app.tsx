import styles from './app.module.scss';

import { ReactComponent as Logo } from './logo.svg';
import star from './star.svg';
import { Game } from '@riddile/game';

export function App() {
  return (
    <div className={styles.app}>
      <Game />
    </div>
  );
}

export default App;
