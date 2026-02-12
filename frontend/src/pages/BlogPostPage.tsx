import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, User, Clock, ArrowLeft } from "lucide-react";
import { blogService, BlogPost } from "@/service/blog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (slug) loadPost(slug);
    }, [slug]);

    const loadPost = async (slug: string) => {
        try {
            const data = await blogService.getBlogBySlug(slug);
            setPost(data);
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="container py-20"><Skeleton className="h-12 w-3/4 mb-4" /><Skeleton className="h-96 w-full" /></div>;
    if (error || !post) return <div className="container py-20 text-center"><h1>Post not found</h1><Button asChild className="mt-4"><Link to="/blog">Back to Blog</Link></Button></div>;

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header Image (if exists) or Gradient */}
            <div className={`w-full h-[300px] md:h-[400px] ${post.imageUrl ? '' : 'bg-primary/10'} relative flex items-center justify-center overflow-hidden`}>
                {post.imageUrl ? (
                    <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="text-primary/20 font-bold text-6xl">Blog</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>

            <article className="container max-w-4xl -mt-32 relative z-10">
                <Button variant="outline" size="sm" asChild className="mb-6 bg-background/50 backdrop-blur">
                    <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to All Posts</Link>
                </Button>

                <div className="bg-card border border-border shadow-lg rounded-xl p-6 md:p-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                        <Badge>{post.category || "General"}</Badge>
                        {post.isPinned && <Badge variant="secondary">Featured</Badge>}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">{post.title}</h1>

                    <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm mb-8 border-b border-border pb-8">
                        <span className="flex items-center gap-2"><User className="h-4 w-4" /> {post.author}</span>
                        <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> {new Date(post.createdAt).toLocaleDateString()}</span>
                        <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {blogService.calculateReadTime(post.content)}</span>
                    </div>

                    {/* Content Renderer - Handling HTML safely */}
                    <div
                        className="prose prose-lg dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </article>
        </div>
    );
}