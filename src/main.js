import './style.css'
import dayjs from 'dayjs'
import { supabase } from './supabase'

const articlesContainer = document.getElementById('articlesContainer');
const articleForm = document.getElementById('articleForm');
const sortSelect = document.getElementById('sortSelect');

// Funkcja odpowiedzialna za pobieranie i wyswietlanie artykulow
async function fetchArticles() {
    // Pobieramy biezace ustawienie sortowania z selecta
    const [column, direction] = sortSelect.value.split('.');
    const isAscending = direction === 'asc';

    articlesContainer.innerHTML = '<p class="text-gray-500 animate-pulse">Aktualizowanie listy...</p>';

    // Zapytanie do API Supabase z uwzglednieniem sortowania (Zadanie dodatkowe 2)
    const { data: articles, error } = await supabase
        .from('article')
        .select('*')
        .order(column, { ascending: isAscending });[cite: 77]

    if (error) {
        console.error('Blad pobierania:', error.message);
        articlesContainer.innerHTML = '<p class="text-red-500">Nie udalo se pobrac artykulow.</p>';
        return;
    }

    if (articles.length === 0) {
        articlesContainer.innerHTML = '<p class="text-gray-500">Brak artykulow w bazie danych.</p>';
        return;
    }

    // Renderowanie listy pobranych artykulow
    articlesContainer.innerHTML = articles.map(article => {
        // Formatowanie daty do formatu DD-MM-YYYY (Zadanie dodatkowe 1)
        const formattedDate = dayjs(article.created_at).format('DD-MM-YYYY');[cite: 75]

        return `
      <article class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
        <h3 class="text-2xl font-bold text-gray-900 mb-1">${article.title}</h3>
        <h4 class="text-lg text-gray-500 font-medium mb-3">${article.subtitle}</h4>
        
        <div class="flex items-center text-xs text-gray-400 space-x-2 mb-4">
          <span class="font-semibold text-gray-600">${article.author}</span>
          <span>•</span>
          <span>${formattedDate}</span>
        </div>
        
        <p class="text-gray-700 whitespace-pre-line leading-relaxed">${article.content}</p>
        
        ${article.tags ? `
          <div class="mt-4 flex flex-wrap gap-1.5">
            ${article.tags.map(tag => `<span class="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">#${tag}</span>`).join('')}
          </div>
        ` : ''}
      </article>
    `;
    }).join('');
}

// Obsluga wysylania formularza (Tworzenie nowego artykulu)
articleForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const subtitle = document.getElementById('subtitle').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;
    const createdAtInput = document.getElementById('createdAt').value;

    // Obiekt z danymi do wyslania
    const newArticle = {
        title,
        subtitle,
        author,
        content
    };

    // Jesli u¿ytkownik podal wlasna date, dodaj ja (Zadanie dodatkowe 3)
    if (createdAtInput) {
        newArticle.created_at = dayjs(createdAtInput).toISOString();[cite: 78, 79]
    }

    // Zapytanie POST do API Supabase
    const { error } = await supabase
        .from('article')
        .insert([newArticle]);[cite: 69]

    if (error) {
        alert('Blad podczas dodawania artykulu: ' + error.message);
        return;
    }

    // Reset formularza i odswiezenie widoku
    articleForm.reset();
    fetchArticles();
});

// Nasluchiwanie zmiany kryterium sortowania
sortSelect.addEventListener('change', fetchArticles);[cite: 76]

// Pierwsze uruchomienie po zaladowaniu skryptu
fetchArticles();