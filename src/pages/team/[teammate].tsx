import { domAnimation, LazyMotion, m, motion } from "framer-motion";
import { useRouter } from "next/router";


import CustomButton, { ButtonIcon } from "@components/CustomButton/CustomButton";
import RoleTag from "@components/RoleTag";
import HeadTag from "@components/HeadTag";
import Author, { getAuthor, getAuthorsList, Role, getRoleFromString } from "@classes/Author";
import { slideButtonDown, slideInUp } from "@helpers/animations";
import WEBSITE_INFO from '@helpers/webSiteInfo';
import globalStyles from '@styles/teammate.styles';
import Post, { filterPostsByAuthor } from "@classes/Post";

import PostGrid from '@components/PostsGrid';
import AuthorSocialLinks from "@components/AuthorSocialLinks";

interface TeammatePageProps{author: Author, authorPosts: Post[]};

type Params = {teammate: string};
type StaticResponse = {params: Params};

var authorPageKeywords = ['Author', 'Writter', 'Blogger', 'Teammate', WEBSITE_INFO.NAME];

const Teammate: React.FC<TeammatePageProps> = ({author, authorPosts}: TeammatePageProps) => {
    const router = useRouter();
    authorPageKeywords.push(author.name,author.instagram, author.twitter);
    author.roles.map((val) => authorPageKeywords.push(val));

    return (
        <div> 
            <style jsx global>
                {globalStyles}
            </style>
            <HeadTag 
              image={author.image_path}
              title={`${WEBSITE_INFO.NAME} - ${author.name}`}
              description={`${WEBSITE_INFO.NAME} Teammate ${author.name} - Info and posts from one of our Teammates`}
              keywords={authorPageKeywords} 
              date={new Date()} 
              url={`/team/${author.key}`} 
            />
            <LazyMotion features={domAnimation}>
                <div className="page">
                    <main className="teammate-page">
                        <motion.div variants={slideButtonDown} style={{margin: ".5rem 0"}}>
                            <CustomButton description='Return to Blog page' text='' icon={ButtonIcon.arrowBack} onClick={() => {router.back()}}/>
                        </motion.div>
                        <motion.article itemProp="author" itemScope  itemType='https://schema.org/author' variants={slideInUp} className="teammate-page-author-info-row" > 
                            <div style={{ alignItems: "center", display: 'flex',flexDirection: 'column'}}>
                                <img src={author.image_path} alt={`${author.name} image`} className="teammate-page-author-image"/>
                            </div>
                            <div>
                                <h1 itemProp='name'>{author.name}</h1>
                                <div className="author-roles">
                                    {
                                        author.roles.map((roll: string, index: number) => {
                                            return <RoleTag key={index} role={Role[getRoleFromString(roll)]}/>
                                        })
                                    }
                                </div>
                                <p>{author.about}</p>
                            </div>
                        </motion.article>
                        <section style={{margin: "1rem 0"}}>
                            <AuthorSocialLinks author={author}/>
                        </section>

                    </main>
                    <section className="teammate-page-posts-section">
                        <PostGrid posts={authorPosts}/>
                    </section>
                </div>
            </LazyMotion>
        </div>
    )
} 


export async function getStaticPaths(){
    const authorsList = getAuthorsList();
    const paths = authorsList.map(authorKey => ({
        params: {
            teammate: authorKey[0]
        }
    }));

    return {paths, fallback: false};
}

export async function getStaticProps({params}: StaticResponse ){
    const author: Author = getAuthor(params.teammate);
    const authorPosts: Post[] = filterPostsByAuthor(author);
    return {
        props:{ author, authorPosts } 
    };
}

export default Teammate;
