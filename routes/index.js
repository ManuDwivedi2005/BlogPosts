import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import dotenv from 'dotenv';
import pg from 'pg';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 8080;

// Replicate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Use method-override to handle PUT/PATCH/DELETE from forms
app.use(methodOverride('_method'));

/* =========================
   SupaBase Connection Setup
========================= */

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Force IPv4, as Render can have issues with IPv6 routing
    family: 4
});

console.log("✅ V2: Attempting to connect to PostgreSQL via Supabase (IPv4 forced)");

/* =========================
   Routes
========================= */

// Show all posts from database
app.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
        res.render('posts', { posts: rows });
    } catch (err) {
        console.error("Database query error:", err);
        res.status(500).render('error', { message: 'Sorry, we could not fetch the posts from the database.' });
    }
});

// Show form to create a new post
app.get('/posts/new', (req, res) => {
    res.render('new');
});

// Create a new post in the database
app.post('/posts', async (req, res) => {
    const { title, content, author } = req.body;
    try {
        const sql = 'INSERT INTO posts (title, content, author) VALUES ($1, $2, $3)';
        await pool.query(sql, [title, content, author]);
        res.redirect('/');
    } catch (err) {
        console.error("Error creating post:", err);
        res.status(500).render('error', { message: 'There was a problem creating your post.' });
    }
});

// Show a specific post
app.get('/posts/:id/show', async(req,res)=>{
    const postId=req.params.id;
    try{
        const { rows }=await pool.query('SELECT * FROM posts WHERE id=$1',[postId]);
        if(rows.length===0){
            return res.status(404).send('Post not found');
        }
        res.render('show',{info:rows[0]});
    }catch(err){
        console.error("Error retrieving post:", err);
        res.status(500).render('error', { message: 'Could not find the requested post.' });
    }
})

// Edit posts
app.get('/posts/:id/edit', async(req,res)=>{
    const postId = req.params.id;
    try{
        const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [postId]);
        if(rows.length === 0){
            return res.status(404).send('Post not found');
        }
        res.render('edit',{post:rows[0]});
    }catch(err){
        console.error("Error loading edit page:", err);
        res.status(500).render('error', { message: 'There was a problem loading the edit page.' });
    }}
)

// Update posts
app.patch('/posts/:id', async(req,res)=>{
    const postId = req.params.id;
    const {title, content} = req.body;
    try{
        const sql = 'UPDATE posts SET title = $1, content = $2 WHERE id = $3';
        await pool.query(sql, [title, content, postId]);
        res.redirect('/');
    }catch(err){
        console.error("Error updating post:", err);
        res.status(500).render('error', { message: 'There was a problem updating your post.' });
    }

})

// Delete posts
app.delete('/posts/:id', async(req,res)=>{
    const postId = req.params.id;
    try{
        const sql = 'DELETE FROM posts WHERE id = $1';
        await pool.query(sql, [postId]);
        // AJAX request ke liye, redirect ke bajaye success ka JSON response bhejte hain.
        res.status(200).json({ message: 'Post deleted successfully' });
    }catch(err){
        console.error(err);
        // Error ko bhi JSON format mein bhejte hain taaki frontend use dikha sake.
        res.status(500).json({ message: 'Error deleting post' });
    }
})



app.listen(process.env.PORT || port, () => {
    console.log(`Server is listening on port ${process.env.PORT || port}`);
});