import './index.css';

const DashMenu = ({ count, title }) => {
    return (
        <div className="dash_menu">
            <div className="dash_menu_content">
                {(count || count === 0) && 
                <div className="dash_menu_count">
                    {count}
                </div>}

                <div className="dash_menu_title">
                    {title}
                </div>
            </div>
            <div className="arrow_cta">
                
            </div>
        </div>
    )
}

export default DashMenu