import Link from "next/link";
import { useEffect, useState } from "react";
import Post from "../classes/postType";
import { formateDate } from "../utils/formateDate";
import ActionIconButton, { ActionButtonIcon } from "./ActionIconButton";
import ListOfCategories from "./ListCategories";
import WEB_SITE_INFO from '../utils/webSiteInfo';
import copyToClipboard from "../utils/copyToClipBoard";

const authorImageSize: string ="4.3em";
const instagramURL: string = "https://www.instagram.com";
const twitterURL: string = "https://www.twitter.com";

interface InternPostInformationProps{post: Post}


const InternPostInformation: React.FC<InternPostInformationProps> = ({post}:InternPostInformationProps) =>{    
    const [isShareApiAvailable, setIsShareApiAvailable] = useState(false);
    const shareURL: string = `${WEB_SITE_INFO.DEFAULT_URL}/blog/${post.slug}`;
    const shareText: string = `A ${WEB_SITE_INFO.NAME} Blog post by ${post.author.name} - ${post.title}`;
    const autorRedirectLink: string = `/team/${post.author.key}`;
    const formatedDate: string = formateDate(post.date);
    const hasntTwitter: boolean = post.author.twitter != null || post.author.twitter == ""

    const redirectToInstagram = () => window.open(`${instagramURL}/${post.author.instagram}/`);
    const redirectToTwitter = () => window.open(`${twitterURL}/${post.author.twitter}/`);
    const openShareWindow = () => window.navigator.share({title:post.title,text: shareText,url:shareURL});
    const copyPostLink = () => copyToClipboard(shareURL);


    useEffect(() => {
        setIsShareApiAvailable(!!window.navigator.share);
    }, []);

    return(
        <>
            <div className="post-author-info" >
            <div style={{display: "flex", alignItems: "center"}}>
                    {/* IMAGE */}
                    <div>
                        <Link href={autorRedirectLink}>
                            <img 
                                className="post-info-author-image"
                                width={authorImageSize}
                                height={authorImageSize}
                                style={{height: authorImageSize, width: authorImageSize}}
                                alt={`${post.author.name} image`}  
                                src={post.author.image_path}>
                            </img>
                        </Link>
                    </div>
                    {/* NAME AND PUBLISH DATE */}
                    <div className="author-name-and-date">
                        <Link href={autorRedirectLink}>
                            <p className="post-info-author-name">{post.author.name}</p>
                        </Link>
                        <p className="post-info-publish-date">{formatedDate}</p>
                    </div>
                </div>
                <div className="post-info-buttons">
                    <ActionIconButton icon={ActionButtonIcon.Instagram} onClick={redirectToInstagram}/>
                    {hasntTwitter ? <ActionIconButton icon={ActionButtonIcon.Twitter} onClick={redirectToTwitter}/> : null} 
                    {isShareApiAvailable ? 
                        <ActionIconButton icon={ActionButtonIcon.Share} onClick={openShareWindow}/> 
                        : null
                    }
                    <ActionIconButton icon={ActionButtonIcon.Copy} onClick={copyPostLink}/>
                </div>
            </div>
            <div className="post-categories-info">
                <ListOfCategories categories={post.categories}/>    
            </div>
        </>
    );
}


export default InternPostInformation;