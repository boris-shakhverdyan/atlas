import SectionsArea from '../../components/SectionsArea';
import { SuccessGreenIcon } from '../../icons';
import styles from './excursionCreated.module.scss';
import BaseLayout from '../../layouts/BaseLayout';
import UnfilledButton from '../../components/Buttons/UnfilledButton';
import { Link } from 'react-router-dom';

const ExcursionCreated = () => {
    return (
        <BaseLayout>
            <SectionsArea>
                <section className={`f-c-col ${styles.excursionCreatedSection}`}>
                    <div className="wrapper">
                        <div className="excursionCreatedSection  gap-30">
                            <div className="f-column sectionBlock al-center">
                                <SuccessGreenIcon height={100} width={100} />
                                <h2 className="section-title txt-center">Экскурсия создана</h2>
                                <Link to={'/profile/guide/excursions'}>
                                    <UnfilledButton title={'К моим экскурсиям'} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </SectionsArea>
        </BaseLayout>
    );
};

export default ExcursionCreated;
