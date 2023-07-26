import Navbar from '../../components/Navbar'
import GlassButton from '../../components/GlassButton'
import { Link } from 'react-router-dom'

import './index.css'

const Disclaimer = () => {
    return (
        <>
        <Navbar title="Mentions Légales" />
        <div className='disclaimer'>
            <div className='disclaimer-body'>
                <p>
                    Lorem ipsum dolor sit amet. In consectetur aperiam et unde totam est natus voluptates sit repellat blanditiis in consequatur eius aut aliquam assumenda qui quasi ducimus. Hic magni ipsa ex voluptas quasi et tenetur praesentium non obcaecati harum sed quam officia quo ducimus facilis.

                    Est molestias officiis est officia eveniet ut unde unde ut praesentium vero et voluptatibus quidem. Vel autem harum et consequatur quidem id labore distinctio! Et alias facilis et dolor natus et inventore molestias hic doloremque consequuntur.

                    Et omnis dolorem aut sint ipsum At sint rerum ea voluptates suscipit id perspiciatis soluta est voluptatem nobis. Vel similique quasi non error velit aut autem dolor quo quidem ullam sit sint galisum. Hic voluptatem consequatur aut quidem modi et ullam porro aut iusto atque. Nam sint iste ut blanditiis autem et galisum quae vel doloribus voluptates ea velit minus et explicabo obcaecati hic incidunt Quis.
                    Lorem ipsum dolor sit amet. In consectetur aperiam et unde totam est natus voluptates sit repellat blanditiis in consequatur eius aut aliquam assumenda qui quasi ducimus. Hic magni ipsa ex voluptas quasi et tenetur praesentium non obcaecati harum sed quam officia quo ducimus facilis.

                    Est molestias officiis est officia eveniet ut unde unde ut praesentium vero et voluptatibus quidem. Vel autem harum et consequatur quidem id labore distinctio! Et alias facilis et dolor natus et inventore molestias hic doloremque consequuntur.

                    Et omnis dolorem aut sint ipsum At sint rerum ea voluptates suscipit id perspiciatis soluta est voluptatem nobis. Vel similique quasi non error velit aut autem dolor quo quidem ullam sit sint galisum. Hic voluptatem consequatur aut quidem modi et ullam porro aut iusto atque. Nam sint iste ut blanditiis autem et galisum quae vel doloribus voluptates ea velit minus et explicabo obcaecati hic incidunt Quis.
                </p>
            </div>
            <div className='disclaimer-footer'>
                <Link to='/home'><GlassButton text='Accueil' /></Link>
            </div>
        </div>
        </>
    )
}

export default Disclaimer