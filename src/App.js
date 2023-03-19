import { lazy, Suspense } from 'react';

import SubmitProvider from './store/SubmitProvider';

const Modal = lazy(() => import('./components/modal/Modal'));
const Navigation = lazy(() => import('./components/navigation/Navigation'));
const Header = lazy(() => import('./components/header/Header'));
const MainSection = lazy(() => import('./components/main/Mainsection'));
const Footer = lazy(() => import('./components/footer/Footer'));

function App() {
	return (
		<SubmitProvider>
			<Suspense>
				<Modal />
			</Suspense>
			<Suspense>
				<Navigation />
			</Suspense>
			<Suspense>
				<Header />
			</Suspense>
			<Suspense>
				<MainSection />
			</Suspense>
			<Suspense>
				<Footer />
			</Suspense>
		</SubmitProvider>
	);
}

export default App;
