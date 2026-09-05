import { useMemo, useState } from "react";
import "./App.css";
const initialBooks = [
  {
    id: 1,
    title: "O Hobbit",
    category: "Fantasia",
    author: "J. R. R. Tolkien",
    status: "Disponível",
  },
  {
    id: 2,
    title: "Torto Arado",
    category: "Literatura brasileira",
    author: "Itamar Vieira Junior",
    status: "Emprestado",
  },
  {
    id: 3,
    title: "1984",
    category: "Ficção científica",
    author: "George Orwell",
    status: "Disponível",
  },
  {
    id: 4,
    title: "Pequeno Príncipe",
    category: "Infantojuvenil",
    author: "Antoine de Saint-Exupéry",
    status: "Disponível",
  },
  {
    id: 5,
    title: "Sapiens",
    category: "História",
    author: "Yuval Noah Harari",
    status: "Reservado",
  },
  {
    id: 6,
    title: "Dom Casmurro",
    category: "Clássico",
    author: "Machado de Assis",
    status: "Disponível",
  },
];
function SearchControls({ query, onQueryChange, total, shown }) {
  return (
    <div className="controls">
      <label htmlFor="search">Buscar no catálogo</label>
      <div className="search-wrap">
        <span>⌕</span>
        <input
          id="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Título, autor ou categoria..."
        />
      </div>
      <small>
        {shown} de {total} livros exibidos
      </small>
    </div>
  );
}
function BookCard({ book, onEdit, onDelete }) {
  const initials = book.title
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  return (
    <article className="book-card">
      <div className="book-cover">
        <span>{initials}</span>
      </div>
      <div className="book-info">
        <div className="card-top">
          <span className="category">{book.category}</span>
          <span className={`status ${book.status.toLowerCase()}`}>
            {book.status}
          </span>
        </div>
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <button type="button" className="edit-btn" onClick={() => onEdit(book)}>Editar</button>
        <button type="button" className="delete-btn" onClick={(event) => { event.preventDefault(); onDelete(book.id) }}>Remover</button>
      </div>
    </article>
  );
}
function AddBookForm({ onAdd, editing, onUpdate, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "Literatura",
    status: "Disponível",
  });
  useState(() => { if (editing) setForm(editing) }, [editing]);
  const update = (f) => (e) => setForm({ ...form, [f]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim()) return;
    editing ? onUpdate({ ...editing, ...form }) : onAdd({ ...form, title: form.title.trim(), author: form.author.trim() });
    setForm({
      title: "",
      author: "",
      category: "Literatura",
      status: "Disponível",
    });
  };
  return (
    <form className="add-form" onSubmit={submit}>
      <div>
        <label htmlFor="title">Título</label>
        <input
          id="title"
          value={form.title}
          onChange={update("title")}
          required
          placeholder="Ex.: A Hora da Estrela"
        />
      </div>
      <div>
        <label htmlFor="author">Autor / responsável</label>
        <input
          id="author"
          value={form.author}
          onChange={update("author")}
          required
          placeholder="Nome do autor"
        />
      </div>
      <div>
        <label htmlFor="category">Categoria</label>
        <select
          id="category"
          value={form.category}
          onChange={update("category")}
        >
          <option>Literatura</option>
          <option>Fantasia</option>
          <option>História</option>
          <option>Ficção científica</option>
          <option>Infantojuvenil</option>
        </select>
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select id="status" value={form.status} onChange={update("status")}>
          <option>Disponível</option>
          <option>Emprestado</option>
          <option>Reservado</option>
        </select>
      </div>
      <button type="submit">{editing ? "Salvar alterações" : "+ Adicionar livro"}</button>
      {editing && <button type="button" className="cancel-btn" onClick={onCancel}>Cancelar</button>}
    </form>
  );
}
export default function App() {
  const [books, setBooks] = useState(initialBooks);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const filtered = useMemo(
    () =>
      books.filter((b) =>
        Object.values(b).some((v) =>
          String(v).toLowerCase().includes(query.toLowerCase()),
        ),
      ),
    [books, query],
  );
  return (
    <main>
      <header>
        <div className="brand-mark">L</div>
        <div>
          <p className="eyebrow">BIBLIOTECA DIGITAL</p>
          <h1>
            Catálogo<span>.</span>
          </h1>
        </div>
        <div className="header-note">
          Painel interativo
          <br />
          <b>React + estado reativo</b>
        </div>
      </header>
      <section className="intro">
        <div>
          <p className="eyebrow">EXPLORE SUA PRÓXIMA LEITURA</p>
          <h2>
            Encontre histórias
            <br />
            <em>que ficam com você.</em>
          </h2>
        </div>
        <p className="intro-copy">
          Pesquise entre os livros da coleção ou cadastre uma nova obra para
          compartilhar com a comunidade.
        </p>
      </section>
      <SearchControls
        query={query}
        onQueryChange={setQuery}
        total={books.length}
        shown={filtered.length}
      />
      <section className="book-grid">
        {filtered.length ? (
          filtered.map((b) => <BookCard key={b.id} book={b} onEdit={setEditing} onDelete={(id) => setConfirmDelete(books.find((item) => item.id === id))} />)
        ) : (
          <div className="empty">
            Nenhum livro encontrado. Tente outro termo.
          </div>
        )}
      </section>
      <section className="add-section">
        <div>
          <p className="eyebrow">SUA CONTRIBUIÇÃO</p>
          <h2>Adicionar ao catálogo</h2>
          <p>Cadastre um livro e ele aparecerá instantaneamente na coleção.</p>
        </div>
        <AddBookForm editing={editing} onCancel={() => setEditing(null)} onUpdate={(book) => { setBooks(books.map((item) => item.id === book.id ? book : item)); setEditing(null) }}
          onAdd={(b) => setBooks([...books, { ...b, id: Date.now() }])}
        />
      </section>
      <footer>
        <span>© 2024 Catálogo</span>
        <span>Feito para leitores curiosos.</span>
      </footer>
      {editing && <div className="modal-backdrop"><div className="modal"><button className="close-modal" onClick={() => setEditing(null)}>×</button><p className="eyebrow">EDITAR LIVRO</p><h2>Atualizar cadastro</h2><AddBookForm editing={editing} onCancel={() => setEditing(null)} onUpdate={(book) => { setBooks(books.map((item) => item.id === book.id ? book : item)); setEditing(null) }} onAdd={() => {}} /></div></div>}
      {confirmDelete && <div className="modal-backdrop"><div className="modal confirm-modal"><p className="eyebrow">CONFIRMAÇÃO</p><h2>Remover livro?</h2><p>Tem certeza que deseja remover <strong>{confirmDelete.title}</strong> do catálogo?</p><div className="confirm-actions"><button type="button" className="cancel-btn" onClick={() => setConfirmDelete(null)}>Cancelar</button><button type="button" className="confirm-delete" onClick={() => { setBooks(books.filter((item) => item.id !== confirmDelete.id)); setConfirmDelete(null) }}>Sim, remover</button></div></div></div>}
    </main>
  );
}
