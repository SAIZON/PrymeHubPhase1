import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight, TrendingUp, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogService, BlogPost } from "@/service/blog";

const categories = [
    "All Posts",
    "Home Loans",
    "Personal Loans",
    "Business Loans",
    "Credit Score",
    "Personal Finance",
];

export default function Blog() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All Posts");

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        try {
            const data = await blogService.getAllBlogs();
            setPosts(data);
        } catch (error) {
            console.error("Failed to load blogs", error);
        } finally {
            setLoading(false);
        }
    };

    // Logic: First post is "Featured", rest are grid items
    // Note: You might want to filter specific "isPinned" posts for featured in the future
    const featuredPost = posts.length > 0 ? posts[0] : null;
    const gridPosts = posts.length > 1 ? posts.slice(1) : [];

    // Filter Logic (Client-side for now)
    const filteredGridPosts = selectedCategory === "All Posts"
        ? gridPosts
        : gridPosts.filter(post => post.category === selectedCategory);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-IN", {
            year: "numeric", month: "short", day: "numeric"
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="gradient-hero py-16 md:py-20">
                <div className="container text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Financial Insights & Guides
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Expert advice, tips, and news to help you make smarter financial decisions
                    </p>
                </div>
            </section>

            {/* Featured Post */}
            {featuredPost && (
                <section className="py-12 md:py-16">
                    <div className="container">
                        <Card className="max-w-5xl mx-auto shadow-card border-border/50 overflow-hidden">
                            <div className="grid md:grid-cols-2">
                                {/* Featured Image Section */}
                                <div className="h-[250px] md:h-auto relative overflow-hidden bg-muted flex items-center justify-center">
                                    {featuredPost.imageUrl ? (
                                        <img
                                            src={featuredPost.imageUrl}
                                            alt={featuredPost.title}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                        />
                                    ) : (
                                        <div className="bg-gradient-to-br from-primary to-primary/70 w-full h-full flex items-center justify-center">
                                            <TrendingUp className="h-20 w-20 text-primary-foreground/30" />
                                        </div>
                                    )}
                                </div>

                                <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                                    <div className="flex gap-2 mb-3">
                                        <Badge className="w-fit bg-accent text-accent-foreground">Featured</Badge>
                                        <Badge variant="outline">{featuredPost.category || "General"}</Badge>
                                    </div>

                                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                                        {featuredPost.title}
                                    </h2>

                                    <p className="text-muted-foreground mb-6 line-clamp-3 text-lg">
                                        {featuredPost.excerpt || featuredPost.content.substring(0, 150) + "..."}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                                        <span className="flex items-center gap-1">
                                            <User className="h-4 w-4" />
                                            {featuredPost.author || "Admin"}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {formatDate(featuredPost.createdAt)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {blogService.calculateReadTime(featuredPost.content)}
                                        </span>
                                    </div>

                                    <Button className="w-fit" asChild>
                                        <Link to={`/blog/${featuredPost.slug}`}>
                                            Read Article <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardContent>
                            </div>
                        </Card>
                    </div>
                </section>
            )}

            {/* Categories */}
            <section className="py-4">
                <div className="container">
                    <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                size="sm"
                                className="rounded-full"
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-12 md:py-16">
                <div className="container">
                    {posts.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground text-lg">No blog posts found.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                            {filteredGridPosts.map((post) => (
                                <Card key={post.id} className="flex flex-col shadow-card border-border/50 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
                                    {/* Grid Item Image */}
                                    {post.imageUrl && (
                                        <div className="h-48 overflow-hidden border-b border-border/50">
                                            <Link to={`/blog/${post.slug}`}>
                                                <img
                                                    src={post.imageUrl}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                                />
                                            </Link>
                                        </div>
                                    )}

                                    <CardContent className="p-6 flex-1 flex flex-col">
                                        <Badge variant="secondary" className="mb-3 w-fit">
                                            {post.category || "General"}
                                        </Badge>

                                        <Link to={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                                            <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                                                {post.title}
                                            </h3>
                                        </Link>

                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                                            {post.excerpt || post.content.substring(0, 100) + "..."}
                                        </p>

                                        <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-border/50">
                                            <span className="flex items-center gap-1">
                                                <User className="h-3 w-3" />
                                                {post.author || "Admin"}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                {blogService.calculateReadTime(post.content)}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Load More (Optional Placeholder) */}
                    {filteredGridPosts.length > 9 && (
                        <div className="text-center mt-12">
                            <Button variant="outline" size="lg">Load More Articles</Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-16 md:py-20 bg-muted/30">
                <div className="container">
                    <Card className="max-w-2xl mx-auto shadow-card border-border/50">
                        <CardContent className="p-8 text-center">
                            <h2 className="text-2xl font-bold text-foreground mb-3">
                                Subscribe to Our Newsletter
                            </h2>
                            <p className="text-muted-foreground mb-6">
                                Get the latest financial tips and loan offers delivered to your inbox weekly.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <Button>Subscribe</Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-4">
                                We respect your privacy. Unsubscribe anytime.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}