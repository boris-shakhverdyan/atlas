import SectionsArea from '../../components/SectionsArea';
import styles from './notFound.module.scss';
import { getImgPath } from '../../utils/getAssetsPath';
import BaseLayout from '../../layouts/BaseLayout';
import UnfilledButton from '../../components/Buttons/UnfilledButton';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <BaseLayout>
            <SectionsArea>
                <section
                    style={{ backgroundImage: `url(${getImgPath('404.svg')})` }}
                    className={`f-c-col ${styles.notFoundSection}`}
                >
                    <div className="wrapper">
                        <div className="notFoundBlock  gap-30">
                            <div className="f-column sectionBlock al-center">
                                <h2 className="section-title txt-center">Страница не найдена</h2>
                                <Link to={'/'}>
                                    <UnfilledButton title={'Вернуться на главную'} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </SectionsArea>
        </BaseLayout>
    );
};

export default NotFound;
