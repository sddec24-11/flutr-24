import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing.js';
import Contact from './pages/Contact.js';
import About from './pages/About.js';
import NotFound from './pages/404.js';
import LocationHome from './pages/LocationHome.js';
import Stats from './pages/Stats.js';

const locations = [
    {
        name: 'Reiman Gardens',
        path: 'reiman-gardens',
        logo: 'reiman-logo.png'
    },
    {
        name: 'Butterfly Pavilion',
        path: 'butterfly-pavilion',
        logo: 'reiman-logo.png'
    },
    {
        name: 'Thanksgiving Point',
        path: 'thanksgiving-point',
        logo: 'reiman-logo.png'
    }
]

export default function App(){
    return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route index element={<Landing />} />
                <Route path="/home" element={<Landing />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                {locations.map((r) => {
                    return<Route path={"/" + r.path} element={<LocationHome data={r} />}/>
                })}
                {locations.map((r) => {
                    return<Route path={"/" + r.path + "/stats"} element={<Stats data={r} />}/>
                })}

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </div>
    )
}