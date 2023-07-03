import './index.css';

const SingleMemberCard = ({ title, paid, subscription }) => {
    return (
        <div className="single_member_card">
            <div className="single_member_card_content">
                <div className={paid ? "single_member_card_paid " : "single_member_card_title"}>
                    {title}
                </div>


                {paid &&


                    <div className="single_member_card_count">
                        {paid}/{subscription}€
                    </div>


                }


            </div>
            <div className="arrow_cta">

            </div>
        </div>
    )
}

export default SingleMemberCard