import { useState, useRef } from 'react'

// ============================================
// DATOS DE PRUEBA (Productos con imágenes reales)
// ============================================
const products = [
  { 
    id: 1, 
    name: 'Yogurt Mediano', 
    price: 45, 
    category: 'Yogurt', 
    image: '🍦',
    description: 'Delicioso yogurt cremoso',
    isActive: true
  },
  { 
    id: 2, 
    name: 'Yogurt Grande', 
    price: 60, 
    category: 'Yogurt', 
    image: '🍦',
    description: 'Yogurt tamaño familiar',
    isActive: true
  },
  { 
    id: 3, 
    name: 'Vaso Chico', 
    price: 10, 
    category: 'Vasos', 
    image: '🥤',
    description: 'Vaso desechable pequeño',
    isActive: true
  },
  { 
    id: 4, 
    name: 'Vaso Mediano', 
    price: 15, 
    category: 'Vasos', 
    image: '🥤',
    description: 'Vaso desechable mediano',
    isActive: true
  },
  { 
    id: 5, 
    name: 'Vaso Grande', 
    price: 20, 
    category: 'Vasos', 
    image: '🥤',
    description: 'Vaso desechable grande',
    isActive: true
  },
  { 
    id: 6, 
    name: 'Topping Fresa', 
    price: 8, 
    category: 'Toppings', 
    image: '🍓',
    description: 'Fresas naturales',
    isActive: true
  },
  { 
    id: 7, 
    name: 'Topping Chocolate', 
    price: 8, 
    category: 'Toppings', 
    image: '🍫',
    description: 'Chocolate amargo',
    isActive: true
  },
  { 
    id: 8, 
    name: 'Topping Oreo', 
    price: 10, 
    category: 'Toppings', 
    image: '🍪',
    description: 'Galleta Oreo triturada',
    isActive: true
  },
  { 
    id: 9, 
    name: 'Agua', 
    price: 15, 
    category: 'Bebidas', 
    image: '💧',
    description: 'Agua purificada',
    isActive: true
  },
  { 
    id: 10, 
    name: 'Refresco', 
    price: 25, 
    category: 'Bebidas', 
    image: '🥤',
    description: 'Refresco de cola',
    isActive: true
  },
  { 
    id: 11, 
    name: 'Combo Yogurt + Vaso', 
    price: 55, 
    category: 'Combos', 
    image: '🧃',
    description: 'Ahorra con este combo',
    isActive: true
  },
  { 
    id: 12, 
    name: 'Cono Sencillo', 
    price: 35, 
    category: 'Conos', 
    image: '🍦',
    description: 'Cono clásico de yogurt',
    isActive: true
  },
  { 
    id: 13, 
    name: 'Cono Especial', 
    price: 50, 
    category: 'Conos', 
    image: '🍦',
    description: 'Cono con toppings',
    isActive: true
  },
]

// ============================================
// CATEGORÍAS CON COLORES TEMÁTICOS
// ============================================
const categories = [
  { name: 'Yogurt', color: '#fcd5ce', icon: '🍦' },
  { name: 'Vasos', color: '#e8e8e4', icon: '🥤' },
  { name: 'Toppings', color: '#f8edeb', icon: '🍓' },
  { name: 'Bebidas', color: '#d8e2dc', icon: '💧' },
  { name: 'Combos', color: '#f4a261', icon: '🧃' },
  { name: 'Conos', color: '#e9c46a', icon: '🍦' },
  { name: 'Promociones', color: '#e76f51', icon: '🏷️' },
]

// ============================================
// COMPONENTE: LOGIN (con diseño heladería)
// ============================================
function Login({ onLogin }) {
  const [email, setEmail] = useState('owner@natyopos.com')
  const [password, setPassword] = useState('owner123')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email && password) {
      let role = 'colaborador'
      let name = 'Colaborador'
      if (email === 'owner@natyopos.com') {
        role = 'owner'
        name = 'Dueño'
      }
      onLogin({ 
        id: 1, 
        name, 
        email, 
        role, 
        branchId: 1,
        branchName: 'Centro'
      })
    }
  }

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginCard}>
        <div style={styles.loginLogoContainer}>
          <span style={styles.loginLogo}>🍦</span>
          <h1 style={styles.logoText}>NATYO</h1>
          <p style={styles.logoSubtext}>Punto de Venta</p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.loginButton}>
            Ingresar
          </button>
        </form>
        <div style={styles.credentialsBox}>
          <p style={styles.credentialTitle}>🔑 Acceso rápido</p>
          <p style={styles.credentialText}><strong>Dueño:</strong> owner@natyopos.com</p>
          <p style={styles.credentialText}><strong>Colaborador:</strong> colaborador@natyopos.com</p>
          <p style={styles.credentialText} style={{fontSize: '11px', color: '#94a3b8'}}>Contraseña: owner123 / colaborador123</p>
        </div>
      </div>
    </div>
  )
}

// ============================================
// COMPONENTE: POS (Punto de Venta mejorado)
// ============================================
function POS({ user }) {
  const [cart, setCart] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [paymentMethod, setPaymentMethod] = useState('efectivo')
  const [cashReceived, setCashReceived] = useState('')
  const [showCheckout, setShowCheckout] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const fileInputRef = useRef(null)

  // Agregar producto al carrito con animación
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
    // Feedback táctil (simulado)
    if (navigator.vibrate) navigator.vibrate(10)
  }

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id))
  }

  const updateQuantity = (id, delta) => {
    const item = cart.find(i => i.id === id)
    if (!item) return
    const newQty = item.quantity + delta
    if (newQty <= 0) {
      removeFromCart(id)
      return
    }
    setCart(cart.map(i => i.id === id ? { ...i, quantity: newQty } : i))
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal

  const handleCheckout = () => {
    if (cart.length === 0) return alert('El carrito está vacío')
    setShowCheckout(true)
  }

  const confirmCheckout = () => {
    let change = 0
    if (paymentMethod === 'efectivo') {
      const received = parseFloat(cashReceived)
      if (isNaN(received) || received < total) {
        return alert('El monto entregado debe ser mayor o igual al total')
      }
      change = received - total
    }
    
    alert(`✅ ¡Venta registrada!\n\nTotal: $${total.toFixed(2)}\nMétodo: ${paymentMethod}\n${paymentMethod === 'efectivo' ? `Cambio: $${change.toFixed(2)}` : ''}\n\n¡Gracias por tu compra! 🍦`)
    setCart([])
    setCashReceived('')
    setShowCheckout(false)
  }

  const filteredProducts = products.filter(p => {
    const matchCategory = selectedCategory === 'Todos' || p.category === selectedCategory
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCategory && matchSearch && p.isActive !== false
  })

  const getCategoryColor = (catName) => {
    const cat = categories.find(c => c.name === catName)
    return cat ? cat.color : '#f3f4f6'
  }

  const getCategoryIcon = (catName) => {
    const cat = categories.find(c => c.name === catName)
    return cat ? cat.icon : '📦'
  }

  // Función para capturar foto (preparada para futura implementación)
  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div style={styles.posContainer}>
      {/* Header */}
      <div style={styles.posHeader}>
        <div style={styles.posHeaderLeft}>
          <span style={styles.posLogo}>🍦</span>
          <h2 style={styles.posTitle}>NATYO POS</h2>
        </div>
        <div style={styles.userInfo}>
          <span style={styles.userAvatar}>👤</span>
          <span style={styles.userName}>{user.name}</span>
          <span style={styles.branchBadge}>{user.branchName}</span>
        </div>
      </div>

      {/* Body */}
      <div style={styles.posBody}>
        {/* Área de productos */}
        <div style={styles.productArea}>
          {/* Barra de búsqueda */}
          <div style={styles.searchContainer}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            <button onClick={handleImageUpload} style={styles.cameraButton}>
              📷
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                capture="environment"
                style={{ display: 'none' }}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    alert('📸 Foto capturada (próximamente se guardará con el producto)')
                  }
                }}
              />
            </button>
          </div>

          {/* Filtro de categorías */}
          <div style={styles.categoryFilter}>
            <button
              onClick={() => setSelectedCategory('Todos')}
              style={{
                ...styles.categoryButton,
                ...(selectedCategory === 'Todos' ? styles.categoryButtonActive : {})
              }}
            >
              🌟 Todos
            </button>
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                style={{
                  ...styles.categoryButton,
                  backgroundColor: selectedCategory === cat.name ? cat.color : 'white',
                  ...(selectedCategory === cat.name ? styles.categoryButtonActive : {})
                }}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          {/* Grid de productos */}
          <div style={styles.productGrid}>
            {filteredProducts.map(product => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                style={{
                  ...styles.productCard,
                  backgroundColor: getCategoryColor(product.category)
                }}
              >
                <div style={styles.productImageContainer}>
                  <span style={styles.productEmoji}>{product.image}</span>
                  {product.imageUrl && (
                    <img src={product.imageUrl} alt={product.name} style={styles.productImage} />
                  )}
                </div>
                <span style={styles.productName}>{product.name}</span>
                <span style={styles.productDescription}>{product.description}</span>
                <span style={styles.productPrice}>${product.price.toFixed(2)}</span>
                <span style={styles.productCategory}>{getCategoryIcon(product.category)}</span>
              </button>
            ))}
            {filteredProducts.length === 0 && (
              <div style={styles.emptyProducts}>
                <p>No hay productos en esta categoría</p>
              </div>
            )}
          </div>
        </div>

        {/* Carrito */}
        <div style={styles.cartArea}>
          <div style={styles.cartHeader}>
            <h3 style={styles.cartTitle}>🛒 Carrito</h3>
            {cart.length > 0 && (
              <span style={styles.cartCount}>{cart.length} productos</span>
            )}
          </div>
          
          {cart.length === 0 ? (
            <div style={styles.emptyCart}>
              <span style={styles.emptyCartIcon}>🛒</span>
              <p>Agrega productos</p>
              <p style={styles.emptyCartSub}>Toca un producto para agregarlo</p>
            </div>
          ) : (
            <>
              <div style={styles.cartItems}>
                {cart.map(item => (
                  <div key={item.id} style={styles.cartItem}>
                    <div style={styles.cartItemInfo}>
                      <div>
                        <span style={styles.cartItemName}>{item.name}</span>
                        <span style={styles.cartItemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <div style={styles.cartItemActions}>
                        <button onClick={() => updateQuantity(item.id, -1)} style={styles.qtyButton}>−</button>
                        <span style={styles.qtyDisplay}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} style={styles.qtyButton}>+</button>
                        <button onClick={() => removeFromCart(item.id)} style={styles.removeButton}>✕</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={styles.cartTotals}>
                <div style={styles.cartTotal}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div style={styles.cartTotal}>
                  <span style={styles.totalLabel}>Total</span>
                  <span style={styles.totalValue}>${total.toFixed(2)}</span>
                </div>
              </div>

              {showCheckout ? (
                <div style={styles.checkoutPanel}>
                  <div style={styles.paymentSection}>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={styles.paymentSelect}
                    >
                      <option value="efectivo">💵 Efectivo</option>
                      <option value="tarjeta">💳 Tarjeta</option>
                      <option value="transferencia">🏦 Transferencia</option>
                    </select>
                    {paymentMethod === 'efectivo' && (
                      <input
                        type="number"
                        placeholder="Monto entregado"
                        value={cashReceived}
                        onChange={(e) => setCashReceived(e.target.value)}
                        style={styles.cashInput}
                      />
                    )}
                  </div>
                  <div style={styles.checkoutActions}>
                    <button 
                      onClick={() => setShowCheckout(false)} 
                      style={styles.cancelButton}
                    >
                      Cancelar
                    </button>
                    <button 
                      onClick={confirmCheckout} 
                      style={styles.confirmButton}
                    >
                      ✅ Confirmar
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={handleCheckout} 
                  style={styles.checkoutButton}
                >
                  🛒 Cobrar
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================
// COMPONENTE: DASHBOARD (solo dueño)
// ============================================
function Dashboard({ user }) {
  return (
    <div style={styles.dashboardContainer}>
      <div style={styles.dashboardHeader}>
        <h2 style={styles.dashboardTitle}>📊 Panel de Control</h2>
        <p style={styles.dashboardSub}>Bienvenido, {user.name}</p>
      </div>
      
      <div style={styles.dashboardGrid}>
        <div style={styles.dashboardCard}>
          <span style={styles.dashboardIcon}>📈</span>
          <p style={styles.dashboardCardLabel}>Ventas Hoy</p>
          <p style={styles.dashboardCardValue}>$12,450</p>
          <p style={styles.dashboardCardChange}>↑ 12% vs ayer</p>
        </div>
        <div style={styles.dashboardCard}>
          <span style={styles.dashboardIcon}>📊</span>
          <p style={styles.dashboardCardLabel}>Ventas Mes</p>
          <p style={styles.dashboardCardValue}>$85,320</p>
          <p style={styles.dashboardCardChange}>↑ 8% vs mes anterior</p>
        </div>
        <div style={styles.dashboardCard}>
          <span style={styles.dashboardIcon}>🎫</span>
          <p style={styles.dashboardCardLabel}>Tickets Hoy</p>
          <p style={styles.dashboardCardValue}>47</p>
          <p style={styles.dashboardCardChange}>Promedio: $265</p>
        </div>
        <div style={styles.dashboardCard}>
          <span style={styles.dashboardIcon}>🏆</span>
          <p style={styles.dashboardCardLabel}>Ticket Promedio</p>
          <p style={styles.dashboardCardValue}>$265</p>
          <p style={styles.dashboardCardChange}>Meta: $300</p>
        </div>
      </div>

      <div style={styles.dashboardCardFull}>
        <h4 style={styles.dashboardSubTitle}>🏷️ Productos Más Vendidos</h4>
        <div style={styles.rankingList}>
          <div style={styles.rankingItem}>
            <span style={styles.rankingNumber}>1</span>
            <span style={styles.rankingName}>Yogurt Mediano</span>
            <span style={styles.rankingValue}>45 unidades</span>
          </div>
          <div style={styles.rankingItem}>
            <span style={styles.rankingNumber}>2</span>
            <span style={styles.rankingName}>Vaso Grande</span>
            <span style={styles.rankingValue}>32 unidades</span>
          </div>
          <div style={styles.rankingItem}>
            <span style={styles.rankingNumber}>3</span>
            <span style={styles.rankingName}>Topping Fresa</span>
            <span style={styles.rankingValue}>28 unidades</span>
          </div>
          <div style={styles.rankingItem}>
            <span style={styles.rankingNumber}>4</span>
            <span style={styles.rankingName}>Combo Yogurt + Vaso</span>
            <span style={styles.rankingValue}>20 unidades</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// COMPONENTE: APP
// ============================================
function App() {
  const [user, setUser] = useState(null)
  const [currentView, setCurrentView] = useState('pos')

  if (!user) {
    return <Login onLogin={setUser} />
  }

  const isOwner = user.role === 'owner'

  return (
    <div style={styles.appContainer}>
      {currentView === 'pos' && <POS user={user} />}
      {currentView === 'dashboard' && isOwner && <Dashboard user={user} />}
      {currentView === 'inventory' && isOwner && (
        <div style={styles.placeholderContainer}>
          <span style={styles.placeholderIcon}>📦</span>
          <p style={styles.placeholderText}>Inventario</p>
          <p style={styles.placeholderSub}>Próximamente: gestión de productos</p>
        </div>
      )}
      {currentView === 'reports' && isOwner && (
        <div style={styles.placeholderContainer}>
          <span style={styles.placeholderIcon}>📄</span>
          <p style={styles.placeholderText}>Reportes</p>
          <p style={styles.placeholderSub}>Próximamente: análisis detallado</p>
        </div>
      )}
      {currentView === 'settings' && isOwner && (
        <div style={styles.placeholderContainer}>
          <span style={styles.placeholderIcon}>⚙️</span>
          <p style={styles.placeholderText}>Configuración</p>
          <p style={styles.placeholderSub}>Próximamente: ajustes del sistema</p>
        </div>
      )}

      <div style={styles.bottomNav}>
        {isOwner && (
          <button 
            onClick={() => setCurrentView('dashboard')}
            style={{...styles.navButton, ...(currentView === 'dashboard' ? styles.navButtonActive : {})}}
          >
            📊 Inicio
          </button>
        )}
        <button 
          onClick={() => setCurrentView('pos')}
          style={{...styles.navButton, ...(currentView === 'pos' ? styles.navButtonActive : {})}}
        >
          🛒 Ventas
        </button>
        {isOwner && (
          <>
            <button 
              onClick={() => setCurrentView('inventory')}
              style={{...styles.navButton, ...(currentView === 'inventory' ? styles.navButtonActive : {})}}
            >
              📦 Inventario
            </button>
            <button 
              onClick={() => setCurrentView('reports')}
              style={{...styles.navButton, ...(currentView === 'reports' ? styles.navButtonActive : {})}}
            >
              📄 Reportes
            </button>
            <button 
              onClick={() => setCurrentView('settings')}
              style={{...styles.navButton, ...(currentView === 'settings' ? styles.navButtonActive : {})}}
            >
              ⚙️ Más
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ============================================
// ESTILOS MEJORADOS (Tema Heladería)
// ============================================
const styles = {
  // Contenedor principal
  appContainer: {
    minHeight: '100vh',
    backgroundColor: '#fdf6f0',
    paddingBottom: '70px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },

  // Login
  loginContainer: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #fdf6f0 0%, #fce4ec 100%)',
    padding: '20px',
  },
  loginCard: {
    backgroundColor: 'white',
    padding: '40px 32px',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
    width: '100%',
    maxWidth: '420px',
  },
  loginLogoContainer: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  loginLogo: {
    fontSize: '48px',
    display: 'block',
  },
  logoText: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#e07a5f',
    margin: '4px 0 0 0',
    letterSpacing: '-1px',
  },
  logoSubtext: {
    fontSize: '14px',
    color: '#8d99ae',
    margin: '4px 0 0 0',
    letterSpacing: '2px',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    marginBottom: '12px',
    border: '2px solid #e8e8e4',
    borderRadius: '12px',
    fontSize: '16px',
    backgroundColor: '#fafafa',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
    outline: 'none',
  },
  loginButton: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #e07a5f 0%, #d66a4a 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
    transition: 'transform 0.1s',
  },
  credentialsBox: {
    marginTop: '20px',
    padding: '16px',
    backgroundColor: '#f8f4f2',
    borderRadius: '12px',
    border: '1px solid #f0e6e0',
  },
  credentialTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#6b4c3b',
    marginBottom: '6px',
  },
  credentialText: {
    fontSize: '13px',
    color: '#4a4a4a',
    margin: '2px 0',
  },

  // POS
  posContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#fdf6f0',
  },
  posHeader: {
    backgroundColor: 'white',
    padding: '14px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #f0e6e0',
  },
  posHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  posLogo: {
    fontSize: '28px',
  },
  posTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#e07a5f',
    margin: 0,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#374151',
  },
  userAvatar: {
    fontSize: '20px',
  },
  userName: {
    fontWeight: '500',
  },
  branchBadge: {
    backgroundColor: '#fce4ec',
    color: '#d66a4a',
    padding: '4px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },

  posBody: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
    gap: '16px',
    padding: '16px',
  },

  // Área de productos
  productArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  searchContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '12px',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: '18px',
    position: 'absolute',
    padding: '12px 14px',
  },
  searchInput: {
    flex: 1,
    padding: '12px 16px 12px 44px',
    border: '2px solid #e8e8e4',
    borderRadius: '12px',
    fontSize: '15px',
    backgroundColor: '#fafafa',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  cameraButton: {
    padding: '10px 14px',
    backgroundColor: '#f8f4f2',
    border: '2px solid #e8e8e4',
    borderRadius: '12px',
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },

  categoryFilter: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    paddingBottom: '12px',
    flexShrink: 0,
  },
  categoryButton: {
    padding: '8px 18px',
    borderRadius: '24px',
    border: '2px solid #e8e8e4',
    backgroundColor: 'white',
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  categoryButtonActive: {
    borderColor: '#e07a5f',
    boxShadow: '0 2px 8px rgba(224, 122, 95, 0.15)',
    transform: 'scale(1.02)',
  },

  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '12px',
    flex: 1,
    overflowY: 'auto',
    alignContent: 'start',
    padding: '4px 0',
  },
  productCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '14px 10px',
    borderRadius: '16px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    position: 'relative',
    minHeight: '120px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  productImageContainer: {
    position: 'relative',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginBottom: '6px',
  },
  productEmoji: {
    fontSize: '36px',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '12px',
  },
  productName: {
    fontSize: '14px',
    fontWeight: '600',
    textAlign: 'center',
    color: '#1f2937',
    marginTop: '4px',
  },
  productDescription: {
    fontSize: '11px',
    textAlign: 'center',
    color: '#8d99ae',
    marginTop: '1px',
  },
  productPrice: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#e07a5f',
    marginTop: '4px',
  },
  productCategory: {
    fontSize: '12px',
    color: '#8d99ae',
    marginTop: '2px',
  },
  emptyProducts: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '40px',
    color: '#8d99ae',
  },

  // Carrito
  cartArea: {
    width: '360px',
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  cartHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  cartTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    margin: 0,
  },
  cartCount: {
    fontSize: '13px',
    color: '#8d99ae',
    backgroundColor: '#f8f4f2',
    padding: '4px 12px',
    borderRadius: '20px',
  },
  emptyCart: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8d99ae',
  },
  emptyCartIcon: {
    fontSize: '48px',
    marginBottom: '12px',
  },
  emptyCartSub: {
    fontSize: '13px',
    color: '#b0b8c4',
  },

  cartItems: {
    flex: 1,
    overflowY: 'auto',
    marginBottom: '12px',
  },
  cartItem: {
    padding: '10px 0',
    borderBottom: '1px solid #f0e6e0',
  },
  cartItemInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemName: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#1f2937',
  },
  cartItemPrice: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#e07a5f',
  },
  cartItemActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '6px',
  },
  qtyButton: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    border: '1px solid #e8e8e4',
    backgroundColor: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s',
  },
  qtyDisplay: {
    fontSize: '15px',
    fontWeight: '600',
    minWidth: '24px',
    textAlign: 'center',
  },
  removeButton: {
    background: 'none',
    border: 'none',
    color: '#d66a4a',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '4px 8px',
  },

  cartTotals: {
    borderTop: '2px solid #f0e6e0',
    paddingTop: '12px',
  },
  cartTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '6px 0',
    fontSize: '15px',
    color: '#1f2937',
  },
  totalLabel: {
    fontWeight: '700',
    fontSize: '17px',
  },
  totalValue: {
    fontWeight: '700',
    fontSize: '19px',
    color: '#e07a5f',
  },

  checkoutPanel: {
    marginTop: '12px',
    borderTop: '2px solid #f0e6e0',
    paddingTop: '12px',
  },
  paymentSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '12px',
  },
  paymentSelect: {
    padding: '12px',
    borderRadius: '12px',
    border: '2px solid #e8e8e4',
    fontSize: '15px',
    backgroundColor: 'white',
  },
  cashInput: {
    padding: '12px',
    borderRadius: '12px',
    border: '2px solid #e8e8e4',
    fontSize: '15px',
    outline: 'none',
  },

  checkoutActions: {
    display: 'flex',
    gap: '10px',
  },
  cancelButton: {
    flex: 1,
    padding: '14px',
    backgroundColor: '#f8f4f2',
    color: '#4a4a4a',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
  },
  confirmButton: {
    flex: 2,
    padding: '14px',
    background: 'linear-gradient(135deg, #e07a5f 0%, #d66a4a 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  checkoutButton: {
    padding: '16px',
    background: 'linear-gradient(135deg, #e07a5f 0%, #d66a4a 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '12px',
    transition: 'transform 0.1s',
  },

  // Navegación inferior
  bottomNav: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTop: '2px solid #f0e6e0',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '10px 0',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.04)',
  },
  navButton: {
    background: 'none',
    border: 'none',
    padding: '6px 16px',
    fontSize: '14px',
    color: '#8d99ae',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'all 0.2s',
  },
  navButtonActive: {
    color: '#e07a5f',
    fontWeight: '600',
  },

  // Dashboard
  dashboardContainer: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
  },
  dashboardHeader: {
    marginBottom: '24px',
  },
  dashboardTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2937',
    margin: 0,
  },
  dashboardSub: {
    fontSize: '16px',
    color: '#8d99ae',
    margin: '4px 0 0 0',
  },
  dashboardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
    gap: '16px',
    marginBottom: '20px',
  },
  dashboardCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    position: 'relative',
  },
  dashboardIcon: {
    fontSize: '24px',
    position: 'absolute',
    top: '16px',
    right: '16px',
    opacity: 0.5,
  },
  dashboardCardLabel: {
    fontSize: '14px',
    color: '#8d99ae',
    margin: '0 0 4px 0',
  },
  dashboardCardValue: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 2px 0',
  },
  dashboardCardChange: {
    fontSize: '13px',
    color: '#4a9e6e',
    margin: 0,
  },
  dashboardCardFull: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  },
  dashboardSubTitle: {
    fontSize: '17px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 12px 0',
  },
  rankingList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  rankingItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 12px',
    backgroundColor: '#faf8f6',
    borderRadius: '10px',
  },
  rankingNumber: {
    fontWeight: '700',
    color: '#e07a5f',
    width: '24px',
  },
  rankingName: {
    flex: 1,
    fontWeight: '500',
    color: '#1f2937',
  },
  rankingValue: {
    color: '#8d99ae',
  },

  // Placeholders
  placeholderContainer: {
    padding: '80px 20px',
    textAlign: 'center',
  },
  placeholderIcon: {
    fontSize: '64px',
    display: 'block',
    marginBottom: '16px',
  },
  placeholderText: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1f2937',
    margin: '0 0 8px 0',
  },
  placeholderSub: {
    fontSize: '16px',
    color: '#8d99ae',
    margin: 0,
  }
}

export default App