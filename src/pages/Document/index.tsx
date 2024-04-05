import SectionsArea from '../../components/SectionsArea';
import styles from './document.module.scss';
import BaseLayout from '../../layouts/BaseLayout';
import BackLink from '../../components/BackLink';

const DocumentPage = () => {
    return (
        <BaseLayout>
            <SectionsArea>
                <section className={`f-c-col ${styles.documentSection}`}>
                    <div className="wrapper w-100p">
                        <div className="documentBlock gap-30 f-column">
                            <BackLink backLinkText={'На главную'} />
                            <div className="f-column gap-20">
                                <h2 className="section-title">Пустой документ</h2>
                                <div className="docText">
                                    <p>В этом блоке будет прописан текстовый контент.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </SectionsArea>
        </BaseLayout>
    );
};

export default DocumentPage;
