import { FC } from 'react';
import styles from './reviewCard.module.scss';
import { AvatarDefaultIcon, StarBordered } from '../../../icons';
import { ReviewCardProps } from '../../../types/reviews.types';
//comment

const ReviewCard: FC<ReviewCardProps> = (props) => {
    return (
        <div className={styles.reviewCard}>
            <div className="header al-center d-f gap-20">
                <div
                    style={{
                        backgroundImage: `url(${props.user.profile_photo})`,
                    }}
                    className={`${styles.avatar} bg-cover f-c-col`}
                >
                    {props.user.profile_photo === null ? <AvatarDefaultIcon height={40} width={40} /> : null}
                </div>
                <div className="profile f-column">
                    <h3>{props.user.first_name} {props.user.last_name}</h3>
                    <div className={styles.rating}>
                        <StarBordered strokeColor={'#D900B6'} />
                        <p>{props.stars}</p>
                    </div>
                </div>
            </div>
            <div className={styles.text}>
                {props.description}
            </div>
        </div>
    );
};

export default ReviewCard;
