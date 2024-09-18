import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function About(){
    return(
        <div>
            <Navbar />
            <div style={{width: '100%', height: '100%'}}>
                <div style={{border: '4px solid #469FCE', background: '#F5F5F5', margin: '11% 20%', borderRadius: '15px'}}>
                    <h2 style={{margin: ''}}>About</h2>
                    <div style={{padding: '10%'}}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas sapien ac ligula efficitur rhoncus. Sed faucibus augue ultricies sagittis ultricies. Sed nec suscipit leo. In imperdiet vestibulum quam. Proin vel mi scelerisque, eleifend lacus ut, sodales erat. Phasellus mattis ultricies elit et cursus. Nam finibus nisi sed elit placerat ornare. Suspendisse eu consectetur ex, eu tincidunt odio. Fusce pretium purus non congue varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas sapien ac ligula efficitur rhoncus. Sed faucibus augue ultricies sagittis ultricies. Sed nec suscipit leo. In imperdiet vestibulum quam. Proin vel mi scelerisque, eleifend lacus ut, sodales erat. Phasellus mattis ultricies elit et cursus. Nam finibus nisi sed elit placerat ornare. Suspendisse eu consectetur ex, eu tincidunt odio. Fusce pretium purus non congue varius. </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}