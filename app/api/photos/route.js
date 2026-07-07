import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// ВРЕМЕННО — вставь ключи напрямую
const supabaseUrl = "https://boojvcdrfpupybscvsbt.supabase.co";
const supabaseKey = "sb_publishable_KwAfgYvn0RmNP5eM_5Wawg_yi";

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request) {
  try {
    const { inventory, place, photoUrl } = await request.json();

    const { data, error } = await supabase
      .from("photos")
      .insert([{ inventory, place, photo_url: photoUrl }]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}