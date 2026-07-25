import {useEffect, useRef, useState} from "react"
import {useNavigate} from "react-router-dom"
import {
  Bot,
  X,
  Send,
  Sparkles,
  RotateCcw,
  ShoppingBag,
  MapPin,
  Package,
  ArrowUpRight
} from "lucide-react"
import API_BASE_URL from "../../config/api"
import "./FarmConnectAI.css"

const AI_API_URL =
  `${API_BASE_URL}/api/ai/recommend/`


const FarmConnectAI = () => {
  const navigate = useNavigate()
  const messagesEndRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)

  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "ai",
      text: "Hello! 👋 I'm FarmConnect AI. I can help you discover products, compare prices, and find the best products from our marketplace.",
      products: []
    }
  ])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth"
    })
  }, [messages, loading])

  const sendMessage = async (customQuery = "") => {
    const finalQuery = customQuery || query

    if (!finalQuery.trim() || loading) {
      return
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: finalQuery,
      products: []
    }

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage
    ])

    setQuery("")
    setLoading(true)

    try {
      const response = await fetch(AI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: finalQuery.trim()
        })
      })

      const data = await response.json()

      console.log("AI API STATUS:", response.status)
      console.log("AI API RESPONSE:", data)

      if (!response.ok) {
        throw new Error(
          data.error || "AI request failed"
        )
      }

      const aiMessage = {
        id: `ai-${Date.now()}`,
        role: "ai",
        text:
          data.message ||
          "Here are the best recommendations I found for you.",
        products: Array.isArray(data.products)
          ? data.products
          : []
      }

      setMessages((previousMessages) => [
        ...previousMessages,
        aiMessage
      ])
    } catch (error) {
      console.error("FarmConnect AI Error:", error)

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: `error-${Date.now()}`,
          role: "ai",
          text: "Sorry, I couldn't connect to FarmConnect AI right now. Please make sure the Django backend and AI service are running.",
          products: []
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const resetChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "ai",
        text: "Hello! 👋 I'm FarmConnect AI. How can I help you today?",
        products: []
      }
    ])

    setQuery("")
  }

  const handleViewProduct = (productId) => {
    setIsOpen(false)
    navigate(`/products/${productId}`)
  }

  const suggestions = [
    "Find cheap vegetables",
    "Show fresh fruits",
    "Find products near Hyderabad"
  ]

  return (
    <>
      {!isOpen && (
        <div className="farm-ai-launcher">
          <div className="farm-ai-tooltip">
            Need help finding products?
          </div>

          <button
            className="farm-ai-button"
            onClick={() => setIsOpen(true)}
            aria-label="Open FarmConnect AI"
            type="button"
          >
            <div className="farm-ai-glow"></div>

            <Bot
              size={30}
              strokeWidth={2.2}
            />

            <span className="farm-ai-status"></span>
          </button>
        </div>
      )}

      {isOpen && (
        <div className="farm-ai-window">
          <div className="farm-ai-header">
            <div className="farm-ai-brand">
              <div className="farm-ai-avatar">
                <Sparkles size={21} />
              </div>

              <div>
                <h3>FarmConnect AI</h3>

                <div className="farm-ai-online">
                  <span></span>
                  Online assistant
                </div>
              </div>
            </div>

            <div className="farm-ai-actions">
              <button
                type="button"
                onClick={resetChat}
                title="New conversation"
              >
                <RotateCcw size={17} />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close assistant"
              >
                <X size={21} />
              </button>
            </div>
          </div>

          <div className="farm-ai-welcome">
            <div className="farm-ai-welcome-icon">
              <Bot size={25} />
            </div>

            <div>
              <strong>FarmConnect AI</strong>

              <p>
                Ask me about products, prices,
                categories, and locations.
              </p>
            </div>
          </div>

          <div className="farm-ai-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`farm-ai-message-row ${message.role}`}
              >
                {message.role === "ai" && (
                  <div className="farm-ai-small-avatar">
                    <Bot size={16} />
                  </div>
                )}

                <div
                  className={`farm-ai-message ${message.role}`}
                >
                  <div className="farm-ai-message-text">
                    {message.text}
                  </div>

                  {message.products.length > 0 && (
                    <div className="farm-ai-products">
                      {message.products.map((product) => (
                        <div
                          key={product.id}
                          className="farm-ai-product-card"
                        >
                          <div className="farm-ai-product-image-wrapper">
                            {product.image_url ? (
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="farm-ai-product-image"
                              />
                            ) : (
                              <div className="farm-ai-product-placeholder">
                                <ShoppingBag size={28} />
                              </div>
                            )}

                            <span className="farm-ai-product-badge">
                              {product.category}
                            </span>
                          </div>

                          <div className="farm-ai-product-content">
                            <h4>{product.name}</h4>

                            <div className="farm-ai-product-price">
                              ₹{product.price}

                              <span>
                                / {product.unit}
                              </span>
                            </div>

                            <div className="farm-ai-product-details">
                              <span>
                                <MapPin size={13} />
                                {product.location}
                              </span>

                              <span>
                                <Package size={13} />
                                {product.available_quantity}{" "}
                                {product.unit} available
                              </span>
                            </div>

                            <button
                              className="farm-ai-view-product"
                              type="button"
                              onClick={() =>
                                handleViewProduct(product.id)
                              }
                            >
                              View Product
                              <ArrowUpRight size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="farm-ai-message-row ai">
                <div className="farm-ai-small-avatar">
                  <Bot size={16} />
                </div>

                <div className="farm-ai-message ai farm-ai-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef}></div>
          </div>

          <div className="farm-ai-suggestions">
            <p>Try asking</p>

            <div>
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    sendMessage(suggestion)
                  }
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          <div className="farm-ai-input-area">
            <input
              type="text"
              value={query}
              placeholder="Ask FarmConnect AI..."
              disabled={loading}
              onChange={(event) =>
                setQuery(event.target.value)
              }
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey
                ) {
                  event.preventDefault()
                  sendMessage()
                }
              }}
            />

            <button
              type="button"
              onClick={() => sendMessage()}
              disabled={!query.trim() || loading}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>

          <div className="farm-ai-footer">
            <Sparkles size={12} />
            Powered by FarmConnect AI
          </div>
        </div>
      )}
    </>
  )
}

export default FarmConnectAI