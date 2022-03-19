import { motion } from 'framer-motion'

import { slideInUp, slideButtonDown } from '@helpers/animations';
import HeadTag from '@components/HeadTag';
import Category, { getAllCategories, getCategoryInfo } from '@classes/category';
import WEBSITE_INFO from '@helpers/webSiteInfo';
import { getAuthor } from '@classes/Author';
import CategoryTag from '@components/CategoryTag/CategoryTag';
import Post, { filterPostsByCategory } from '@classes/Post';

import styles from '@styles/tag.styles.js';
import CustomButton, { ButtonIcon } from '@components/CustomButton/CustomButton';
import { useRouter } from 'next/router';
import PostGrid from '@components/PostGrid/PostsGrid';
import { sortByDate } from '@utils/sort';

interface Params {tag: string};
interface StaticResponse {params: Params};
interface TagInfoProps {category: Category, posts: Array<Post>}

const TagInfo: React.FC<TagInfoProps> = ({category, posts}: TagInfoProps) => {
    const router = useRouter();
    return(
        <>
            <style>
                {styles}
            </style>
            <HeadTag
                image={WEBSITE_INFO.LOGO_PATH}
                date={new Date()}
                description={`Posts with category ${category.name} - ${category.about}`}
                keywords={[category.key.toString()]}
                title={`Posts In ${category.name} Category - ${WEBSITE_INFO.NAME}`}
                url={`${WEBSITE_INFO.URL}/blog/tag/${category.key}`}
                author={getAuthor('renato')}
            />
            {/* <div className='page'> */}
                <main className='tag-especific-page'>
                    <motion.div variants={slideButtonDown}>
                            <CustomButton description='Return to Blog page' text='' icon={ButtonIcon.arrowBack} onClick={() => {router.back()}}/>
                    </motion.div>
                    <motion.div variants={slideButtonDown} className="tag-page-description">
                        <h1>{posts.length}</h1>
                        <h2>Posts in the category <CategoryTag isBig category={category}/></h2>
                    </motion.div>

                    <p>{category.about}</p>
                </main>
                <section className='tag-page-posts-section'>
                    <PostGrid posts={posts}/>
                </section>
            {/* </div> */}
        </>
    )

}


export async function getStaticPaths(){
    const allCategories: Category[]  = getAllCategories();
    const paths = allCategories.map((element: Category) => ({
        params: {
            tag: element.key
        }
    }));

    return {paths, fallback: false};
}

export async function getStaticProps({params}: StaticResponse ){
    const category: Category = getCategoryInfo(params.tag);
    const posts: Array<Post> = filterPostsByCategory([category]).sort(sortByDate);
    return {
        props:{ category, posts } 
    };
}

export default TagInfo