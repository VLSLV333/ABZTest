import { lazy, Suspense } from 'react';

import SubmitProvider from './store/SubmitProvider';

import Header from './components/header/Header';

const Modal = lazy(() => import('./components/modal/Modal'));
const Navigation = lazy(() => import('./components/navigation/Navigation'));
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
				<Header />
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
