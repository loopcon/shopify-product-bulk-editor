<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Session;


class ProductController extends Controller
{
    public function index(Request $request)
    {
        $shopSession = Session::orderBy('id', 'desc')->first();

        if (!$shopSession || !$shopSession->shop || !$shopSession->access_token) {
            return response()->json([
                'error' => 'Shopify session not found'
            ], 400);
        }

        $shop = $shopSession->shop;
        $token = $shopSession->access_token;

        $response = Http::withHeaders([
            'X-Shopify-Access-Token' => $token,
        ])->get("https://{$shop}/admin/api/2024-10/products.json", [
                    'limit' => 250,
                ]);

        return $response->json()['products'] ?? [];
    }
}
