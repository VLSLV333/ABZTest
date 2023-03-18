import Navigation from './components/navigation/Navigation';
import Header from './components/header/Header';
import MainSection from './components/main/Mainsection';
import Footer from './components/footer/Footer';
import SubmitProvider from './store/SubmitProvider';

function App() {
	return (
		<SubmitProvider>
			<Navigation />
			<Header />
			<MainSection />
			<Footer />
		</SubmitProvider>
	);
}

export default App;
