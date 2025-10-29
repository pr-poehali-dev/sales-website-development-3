import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  specs: {
    processor?: string;
    ram?: string;
    storage?: string;
    screen?: string;
    battery?: string;
    weight?: string;
    drivers?: string;
    connectivity?: string;
  };
  rating: number;
  inStock: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Premium Laptop Pro',
    price: 89990,
    image: 'https://cdn.poehali.dev/projects/bb0ec418-51d7-4f1f-aeaa-aef674c108ea/files/50e322b3-0cf3-4610-be3f-0cde7bf9da1d.jpg',
    category: 'Ноутбуки',
    specs: {
      processor: 'Intel Core i7 12-го поколения',
      ram: '16 ГБ DDR5',
      storage: '512 ГБ SSD',
      screen: '14" 2880x1800 Retina',
      battery: 'до 18 часов',
      weight: '1.4 кг'
    },
    rating: 4.8,
    inStock: true
  },
  {
    id: 2,
    name: 'Wireless Headphones Elite',
    price: 24990,
    image: 'https://cdn.poehali.dev/projects/bb0ec418-51d7-4f1f-aeaa-aef674c108ea/files/0aac3217-9aff-4a53-8cf4-7d745cf3a295.jpg',
    category: 'Аудио',
    specs: {
      drivers: '40 мм динамики',
      connectivity: 'Bluetooth 5.3, AUX',
      battery: 'до 30 часов',
      weight: '250 г'
    },
    rating: 4.6,
    inStock: true
  },
  {
    id: 3,
    name: 'Smartphone X Pro',
    price: 64990,
    image: 'https://cdn.poehali.dev/projects/bb0ec418-51d7-4f1f-aeaa-aef674c108ea/files/f581eec7-47ab-40bc-83b1-5241d7e4df2f.jpg',
    category: 'Смартфоны',
    specs: {
      processor: 'Snapdragon 8 Gen 2',
      ram: '12 ГБ',
      storage: '256 ГБ',
      screen: '6.7" AMOLED 120Hz',
      battery: '5000 мАч',
      weight: '195 г'
    },
    rating: 4.7,
    inStock: true
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const toggleCompare = (product: Product) => {
    if (compareProducts.find(p => p.id === product.id)) {
      setCompareProducts(compareProducts.filter(p => p.id !== product.id));
    } else {
      if (compareProducts.length < 3) {
        setCompareProducts([...compareProducts, product]);
      }
    }
  };

  const renderHero = () => (
    <section className="bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground py-20 px-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">Электроника премиум-класса</h1>
        <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
          Сравнивайте характеристики и выбирайте лучшее
        </p>
        <Button size="lg" variant="secondary" onClick={() => setActiveSection('catalog')} className="hover-scale">
          <Icon name="ShoppingBag" className="mr-2" size={20} />
          Смотреть каталог
        </Button>
      </div>
    </section>
  );

  const renderCatalog = () => (
    <section className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Каталог товаров</h2>
          <p className="text-muted-foreground">Премиальная электроника с детальными характеристиками</p>
        </div>
        {compareProducts.length > 0 && (
          <Button variant="outline" onClick={() => setActiveSection('compare')}>
            <Icon name="ArrowLeftRight" className="mr-2" size={18} />
            Сравнить ({compareProducts.length})
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <Card key={product.id} className="overflow-hidden hover-scale group">
            <div className="relative overflow-hidden bg-muted">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <Badge className="absolute top-4 right-4">{product.category}</Badge>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription className="mt-2 flex items-center gap-1">
                    <Icon name="Star" className="fill-yellow-400 text-yellow-400" size={16} />
                    {product.rating}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-muted-foreground">
                {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <Icon name="Check" size={14} className="text-accent" />
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <div className="flex items-center justify-between w-full">
                <span className="text-2xl font-bold">{product.price.toLocaleString('ru-RU')} ₽</span>
                {product.inStock && (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <Icon name="Check" size={14} className="mr-1" />
                    В наличии
                  </Badge>
                )}
              </div>
              <div className="flex gap-2 w-full">
                <Button className="flex-1" onClick={() => addToCart(product)}>
                  <Icon name="ShoppingCart" className="mr-2" size={18} />
                  В корзину
                </Button>
                <Button 
                  variant={compareProducts.find(p => p.id === product.id) ? "default" : "outline"}
                  size="icon"
                  onClick={() => toggleCompare(product)}
                  disabled={compareProducts.length >= 3 && !compareProducts.find(p => p.id === product.id)}
                >
                  <Icon name="ArrowLeftRight" size={18} />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );

  const renderCompare = () => (
    <section className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Сравнение товаров</h2>
        <p className="text-muted-foreground">Выберите до 3 товаров для детального сравнения</p>
      </div>

      {compareProducts.length === 0 ? (
        <Card className="p-12 text-center">
          <Icon name="ArrowLeftRight" size={48} className="mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">Товары не выбраны</h3>
          <p className="text-muted-foreground mb-6">Добавьте товары из каталога для сравнения</p>
          <Button onClick={() => setActiveSection('catalog')}>
            Перейти в каталог
          </Button>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-semibold">Характеристика</th>
                {compareProducts.map(product => (
                  <th key={product.id} className="p-4 min-w-[250px]">
                    <Card>
                      <CardHeader className="relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => toggleCompare(product)}
                        >
                          <Icon name="X" size={18} />
                        </Button>
                        <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded mb-3" />
                        <CardTitle className="text-base">{product.name}</CardTitle>
                        <CardDescription className="text-xl font-bold text-foreground">
                          {product.price.toLocaleString('ru-RU')} ₽
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {['processor', 'ram', 'storage', 'screen', 'battery', 'weight', 'drivers', 'connectivity'].map(specKey => {
                const hasSpec = compareProducts.some(p => p.specs[specKey as keyof typeof p.specs]);
                if (!hasSpec) return null;
                
                return (
                  <tr key={specKey} className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium capitalize">
                      {specKey === 'processor' && 'Процессор'}
                      {specKey === 'ram' && 'Оперативная память'}
                      {specKey === 'storage' && 'Накопитель'}
                      {specKey === 'screen' && 'Экран'}
                      {specKey === 'battery' && 'Батарея'}
                      {specKey === 'weight' && 'Вес'}
                      {specKey === 'drivers' && 'Драйверы'}
                      {specKey === 'connectivity' && 'Подключение'}
                    </td>
                    {compareProducts.map(product => (
                      <td key={product.id} className="p-4 text-center">
                        {product.specs[specKey as keyof typeof product.specs] || '—'}
                      </td>
                    ))}
                  </tr>
                );
              })}
              <tr className="border-b hover:bg-muted/50">
                <td className="p-4 font-medium">Рейтинг</td>
                {compareProducts.map(product => (
                  <td key={product.id} className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Icon name="Star" className="fill-yellow-400 text-yellow-400" size={16} />
                      {product.rating}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4"></td>
                {compareProducts.map(product => (
                  <td key={product.id} className="p-4">
                    <Button className="w-full" onClick={() => addToCart(product)}>
                      <Icon name="ShoppingCart" className="mr-2" size={18} />
                      В корзину
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );

  const renderAbout = () => (
    <section className="max-w-4xl mx-auto px-6 py-12 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6">О нас</h2>
      <div className="space-y-4 text-muted-foreground">
        <p className="text-lg leading-relaxed">
          Мы предлагаем только премиальную электронику от ведущих мировых производителей. 
          Каждый товар проходит тщательный отбор и проверку качества.
        </p>
        <p className="text-lg leading-relaxed">
          Наша миссия — помочь вам сделать осознанный выбор, предоставляя детальные характеристики 
          и возможность сравнения различных моделей.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader>
              <Icon name="Award" size={32} className="text-accent mb-2" />
              <CardTitle>Гарантия качества</CardTitle>
              <CardDescription>Официальная гарантия на всю продукцию</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Icon name="Truck" size={32} className="text-accent mb-2" />
              <CardTitle>Быстрая доставка</CardTitle>
              <CardDescription>Доставка в день заказа по Москве</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Icon name="HeadphonesIcon" size={32} className="text-accent mb-2" />
              <CardTitle>Поддержка 24/7</CardTitle>
              <CardDescription>Всегда на связи для решения вопросов</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );

  const renderDelivery = () => (
    <section className="max-w-4xl mx-auto px-6 py-12 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6">Доставка и оплата</h2>
      <Tabs defaultValue="delivery" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="delivery">Доставка</TabsTrigger>
          <TabsTrigger value="payment">Оплата</TabsTrigger>
        </TabsList>
        <TabsContent value="delivery" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Truck" size={24} />
                Курьерская доставка
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-accent" />
                  По Москве — бесплатно при заказе от 50 000 ₽
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-accent" />
                  Доставка в день заказа при оформлении до 14:00
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Check" size={16} className="text-accent" />
                  По России — от 500 ₽, 2-5 дней
                </li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Store" size={24} />
                Самовывоз
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Бесплатно из нашего шоурума в Москве. Можно забрать товар в день заказа.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="payment" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Способы оплаты</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="CreditCard" size={20} className="text-accent" />
                  Банковской картой онлайн
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Wallet" size={20} className="text-accent" />
                  Наличными курьеру
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Building" size={20} className="text-accent" />
                  Безналичный расчет для юрлиц
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Smartphone" size={20} className="text-accent" />
                  СБП и электронные кошельки
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );

  const renderContacts = () => (
    <section className="max-w-4xl mx-auto px-6 py-12 animate-fade-in">
      <h2 className="text-3xl font-bold mb-6">Контакты</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Адрес шоурума</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3">
              <Icon name="MapPin" size={20} className="text-accent mt-1" />
              <div>
                <p className="font-medium">Москва</p>
                <p className="text-muted-foreground">ул. Примерная, д. 123</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="Clock" size={20} className="text-accent mt-1" />
              <div>
                <p className="font-medium">Режим работы</p>
                <p className="text-muted-foreground">Пн-Вс: 10:00 — 21:00</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Связь с нами</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Icon name="Phone" size={20} className="text-accent" />
              <div>
                <p className="font-medium">+7 (495) 123-45-67</p>
                <p className="text-sm text-muted-foreground">Круглосуточно</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="Mail" size={20} className="text-accent" />
              <div>
                <p className="font-medium">info@electroshop.ru</p>
                <p className="text-sm text-muted-foreground">Ответим в течение часа</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="MessageCircle" size={20} className="text-accent" />
              <div>
                <p className="font-medium">Онлайн-чат</p>
                <p className="text-sm text-muted-foreground">На сайте 24/7</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Zap" size={28} className="text-accent" />
            <span className="text-xl font-bold">ElectroShop</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" onClick={() => setActiveSection('home')}>Главная</Button>
            <Button variant="ghost" onClick={() => setActiveSection('catalog')}>Каталог</Button>
            <Button variant="ghost" onClick={() => setActiveSection('about')}>О нас</Button>
            <Button variant="ghost" onClick={() => setActiveSection('delivery')}>Доставка</Button>
            <Button variant="ghost" onClick={() => setActiveSection('contacts')}>Контакты</Button>
          </nav>

          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Корзина</SheetTitle>
                  <SheetDescription>
                    {cart.length === 0 ? 'Ваша корзина пуста' : `Товаров в корзине: ${cart.length}`}
                  </SheetDescription>
                </SheetHeader>
                
                {cart.length > 0 && (
                  <div className="mt-6 space-y-4">
                    {cart.map(item => (
                      <Card key={item.product.id}>
                        <CardContent className="p-4">
                          <div className="flex gap-4">
                            <img 
                              src={item.product.image} 
                              alt={item.product.name}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm mb-1">{item.product.name}</h4>
                              <p className="text-lg font-bold mb-2">
                                {item.product.price.toLocaleString('ru-RU')} ₽
                              </p>
                              <div className="flex items-center gap-2">
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8 ml-auto"
                                  onClick={() => removeFromCart(item.product.id)}
                                >
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-lg">
                        <span className="font-semibold">Итого:</span>
                        <span className="font-bold text-2xl">
                          {getTotalPrice().toLocaleString('ru-RU')} ₽
                        </span>
                      </div>
                      <Button className="w-full" size="lg">
                        <Icon name="CreditCard" className="mr-2" size={20} />
                        Оформить заказ
                      </Button>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {activeSection === 'home' && (
          <>
            {renderHero()}
            {renderCatalog()}
          </>
        )}
        {activeSection === 'catalog' && renderCatalog()}
        {activeSection === 'compare' && renderCompare()}
        {activeSection === 'about' && renderAbout()}
        {activeSection === 'delivery' && renderDelivery()}
        {activeSection === 'contacts' && renderContacts()}
      </main>

      <footer className="border-t bg-muted/50 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Icon name="Zap" size={24} className="text-accent" />
                <span className="font-bold">ElectroShop</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Премиальная электроника с гарантией качества
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Навигация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => setActiveSection('catalog')} className="hover:text-foreground transition-colors">Каталог</button></li>
                <li><button onClick={() => setActiveSection('about')} className="hover:text-foreground transition-colors">О нас</button></li>
                <li><button onClick={() => setActiveSection('delivery')} className="hover:text-foreground transition-colors">Доставка</button></li>
                <li><button onClick={() => setActiveSection('contacts')} className="hover:text-foreground transition-colors">Контакты</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (495) 123-45-67
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@electroshop.ru
                </li>
              </ul>
            </div>
          </div>
          <Separator className="mb-6" />
          <p className="text-center text-sm text-muted-foreground">
            © 2024 ElectroShop. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;