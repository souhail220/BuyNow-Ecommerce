import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export async function getOrCreateCartSession(sessionId: string) {
  const { data, error } = await supabase
    .from('cart_sessions')
    .select('id')
    .eq('session_id', sessionId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching cart session:', error);
    return null;
  }

  if (data) {
    return data.id;
  }

  const { data: newSession, error: createError } = await supabase
    .from('cart_sessions')
    .insert([{ session_id: sessionId }])
    .select('id')
    .single();

  if (createError) {
    console.error('Error creating cart session:', createError);
    return null;
  }

  return newSession?.id;
}

export async function addCartItem(cartSessionId: string, item: any) {
  const { data, error } = await supabase
    .from('cart_items')
    .upsert([{
      cart_session_id: cartSessionId,
      product_id: item.productId,
      product_title: item.title,
      product_price: item.price,
      product_image: item.image,
      product_category: item.category,
      quantity: item.quantity
    }])
    .select();

  if (error) {
    console.error('Error adding cart item:', error);
    return null;
  }

  return data;
}

export async function updateCartItem(itemId: string, quantity: number) {
  const { data, error } = await supabase
    .from('cart_items')
    .update({ quantity })
    .eq('id', itemId)
    .select();

  if (error) {
    console.error('Error updating cart item:', error);
    return null;
  }

  return data;
}

export async function removeCartItem(itemId: string) {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', itemId);

  if (error) {
    console.error('Error removing cart item:', error);
    return false;
  }

  return true;
}

export async function getCartItems(cartSessionId: string) {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*')
    .eq('cart_session_id', cartSessionId);

  if (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }

  return data || [];
}

export async function clearCartItems(cartSessionId: string) {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('cart_session_id', cartSessionId);

  if (error) {
    console.error('Error clearing cart:', error);
    return false;
  }

  return true;
}
