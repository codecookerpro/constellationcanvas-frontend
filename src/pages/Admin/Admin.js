import { PageBox } from 'components';

import { Header, Content } from './components';

export default function Admin(props) {
  return (
    <PageBox header={<Header />}>
      <Content />
    </PageBox>
  );
}
