import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Pin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { blogService, BlogPost } from "@/service/blog";

export default function ManageBlogs() {
    const { toast } = useToast();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

    // Categories List
    const categories = [
        "Home Loans",
        "Personal Loans",
        "Business Loans",
        "Credit Score",
        "Personal Finance",
        "General"
    ];

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        content: "",
        isPinned: false,
        category: "General",
        imageUrl: "",
        excerpt: ""
    });

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            const data = await blogService.getAllBlogs();
            setPosts(data);
        } catch (error) {
            console.error("Failed to load posts");
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to load blog posts",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const openAddModal = () => {
        setEditingPost(null);
        setFormData({
            title: "",
            author: "",
            content: "",
            isPinned: false,
            category: "General",
            imageUrl: "",
            excerpt: ""
        });
        setIsOpen(true);
    };

    const openEditModal = (post: BlogPost) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            author: post.author,
            content: post.content,
            isPinned: post.isPinned,
            category: post.category || "General",
            imageUrl: post.imageUrl || "",
            excerpt: post.excerpt || ""
        });
        setIsOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (editingPost) {
                await blogService.updatePost(editingPost.id, formData);
                toast({ title: "Updated", description: "Blog post updated successfully" });
            } else {
                await blogService.createPost(formData);
                toast({ title: "Created", description: "New blog post published" });
            }
            setIsOpen(false);
            loadPosts();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to save blog post",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await blogService.deletePost(id);
            setPosts(posts.filter((p) => p.id !== id));
            toast({ title: "Deleted", description: "Blog post removed" });
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to delete post" });
        }
    };

    return (
        <div className="p-6 lg:p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Manage Blogs</h1>
                    <p className="text-muted-foreground">Create and edit news and articles</p>
                </div>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={openAddModal}>
                            <Plus className="h-4 w-4 mr-2" />
                            Write New Post
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingPost ? "Edit Post" : "New Blog Post"}</DialogTitle>
                            <DialogDescription>
                                {editingPost ? "Update the content below." : "Share insights with your users."}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            {/* Row 1: Title and Category */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="e.g., Top 5 Loan Tips"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <Select
                                        value={formData.category}
                                        onValueChange={(value) => setFormData({...formData, category: value})}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map(cat => (
                                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Row 2: Author and Image URL */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="author">Author</Label>
                                    <Input
                                        id="author"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        placeholder="e.g., John Doe"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                                    <Input
                                        id="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                            </div>

                            {/* Row 3: Excerpt */}
                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Excerpt (Short Summary)</Label>
                                <Textarea
                                    id="excerpt"
                                    className="h-20"
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    placeholder="Brief description for the card view..."
                                />
                            </div>

                            {/* Row 4: Main Content */}
                            <div className="space-y-2">
                                <Label htmlFor="content">Content (Markdown/HTML)</Label>
                                <Textarea
                                    id="content"
                                    className="min-h-[200px]"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Write your article content here..."
                                    required
                                />
                            </div>

                            {/* Row 5: Pinned Switch */}
                            <div className="flex items-center space-x-2 pt-2">
                                <Switch
                                    id="pinned"
                                    checked={formData.isPinned}
                                    onCheckedChange={(checked) => setFormData({ ...formData, isPinned: checked })}
                                />
                                <Label htmlFor="pinned">Pin as Featured Post</Label>
                            </div>

                            {/* Footer Buttons */}
                            <div className="flex gap-3 pt-4">
                                <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1" disabled={isSubmitting}>
                                    {isSubmitting ? "Saving..." : "Save Post"}
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card className="shadow-card border-border/50">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Published</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-24">Loading...</TableCell>
                                </TableRow>
                            ) : posts.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                        No posts found. Start writing!
                                    </TableCell>
                                </TableRow>
                            ) : (
                                posts.map((post) => (
                                    <TableRow key={post.id}>
                                        <TableCell>
                                            <div className="font-medium flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-muted-foreground" />
                                                {post.title}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{post.category || "General"}</Badge>
                                        </TableCell>
                                        <TableCell>{post.author}</TableCell>
                                        <TableCell>
                                            {post.isPinned && (
                                                <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                                                    <Pin className="h-3 w-3 mr-1" /> Featured
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2 justify-end">
                                                <Button variant="outline" size="icon" onClick={() => openEditModal(post)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Delete Post?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This will permanently delete "{post.title}".
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleDelete(post.id)}
                                                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                            >
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}