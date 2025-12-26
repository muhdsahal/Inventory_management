'use client'

import { useEffect, useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000/api'

function ProductForm({ onCreate }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const res = await fetch(`${API_BASE}/products/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price, stock })
      })
      if (!res.ok) {
        const err = await res.json()
        alert(JSON.stringify(err))
        return
      }
      const data = await res.json()
      onCreate(data)
      setName('')
      setPrice('')
      setStock('')
    } catch (err) {
      alert('Error creating product')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit} className="card">
      <div className="form-row">
        <input className="input" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input className="input" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required type="number" step="0.01" />
        <input className="input small" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} required type="number" />
        <button className="btn" type="submit" disabled={submitting}>{submitting ? 'Adding...' : 'Add'}</button>
      </div>
    </form>
  )
}

export default function Page() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [editValues, setEditValues] = useState({ price: '', stock: '' })

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/products/`)
      if (!res.ok) throw new Error(`API error: ${res.status}`)
      const data = await res.json()
      setProducts(data)
    } catch (err) {
      console.error('Failed to load products', err)
      setError('Failed to fetch products. Is the Django server running on http://localhost:8000 ?')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleCreate = (p) => setProducts(prev => [p, ...prev])
  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return
    const res = await fetch(`${API_BASE}/products/${id}/`, { method: 'DELETE' })
    if (res.status === 204) setProducts(prev => prev.filter(p => p.id !== id))
    else alert('Delete failed')
  }

  const startEdit = (p) => {
    setEditingId(p.id)
    setEditValues({ price: p.price, stock: p.stock })
  }

  const cancelEdit = () => { setEditingId(null); setEditValues({ price: '', stock: '' }) }

  const saveEdit = async (id) => {
    const payload = { price: editValues.price, stock: editValues.stock }
    const res = await fetch(`${API_BASE}/products/${id}/`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: products.find(p=>p.id===id).name, ...payload })
    })
    if (!res.ok) {
      const err = await res.json().catch(()=>({detail:'Update failed'}))
      alert(JSON.stringify(err))
      return
    }
    const data = await res.json()
    setProducts(prev => prev.map(p => p.id === id ? data : p))
    cancelEdit()
  }

  return (
    <div>
      <div className="header">
        <div>
          <h1>Inventory</h1>
          <div className="small">Manage products — add, edit, or remove items</div>
        </div>
      </div>

      <ProductForm onCreate={handleCreate} />

      <div className="card">
        {error ? (
          <div className="empty">{error} <button className="btn ghost small" onClick={load} style={{marginLeft:12}}>Retry</button></div>
        ) : loading ? (
          <div className="loading">Loading...</div>
        ) : products.length === 0 ? (
          <div className="empty">No products yet — add one to get started</div>
        ) : (
          <div className="list">
            {products.map(p => (
              <div className="product-row" key={p.id}>
                <div className="product-title">{p.name}</div>

                {editingId === p.id ? (
                  <>
                    <input className="edit-input" value={editValues.price} onChange={e => setEditValues(ev => ({...ev, price: e.target.value}))} />
                    <input className="edit-input" value={editValues.stock} onChange={e => setEditValues(ev => ({...ev, stock: e.target.value}))} />
                    <div className="product-actions">
                      <button className="btn small" onClick={() => saveEdit(p.id)}>Save</button>
                      <button className="btn ghost small" onClick={cancelEdit}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="product-meta">${p.price}</div>
                    <div className="product-meta">Stock: {p.stock}</div>
                    <div className="product-actions">
                      <button className="btn small" onClick={() => startEdit(p)}>Edit</button>
                      <button className="btn danger small" onClick={() => handleDelete(p.id)}>Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
