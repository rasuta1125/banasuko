# Firebase Firestore クリーンアップガイド

## 現在の問題
- usersコレクションに大量のランダムIDドキュメントが作成されている
- 適切なユーザーデータ構造になっていない

## 解決手順

### 1. Firebase Console でのクリーンアップ
1. https://console.firebase.google.com/ にアクセス
2. プロジェクト `banasuko-auth` を選択
3. Firestore Database を開く
4. `users` コレクションを選択
5. 不要なドキュメントを削除（全て選択して削除）

### 2. 推奨されるFirestore構造

```
users/
  └── {uid}/
      ├── email: string
      ├── displayName: string
      ├── createdAt: timestamp
      ├── updatedAt: timestamp
      ├── plan: "free" | "pro" | "enterprise"
      ├── analysisCount: number
      └── monthlyAnalysisCount: number

diagnoses/
  └── {diagnosisId}/
      ├── userId: string
      ├── imageUrl: string
      ├── results: object
      ├── createdAt: timestamp
      └── analysis: object
```

### 3. Firestore セキュリティルール

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // ユーザーは自分のドキュメントのみアクセス可能
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // 診断結果は所有者のみアクセス可能
    match /diagnoses/{diagnosisId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

### 4. 修正後の期待される動作
- 新規ユーザー登録時: users/{uid} に適切なドキュメントが作成される
- ログイン時: 既存のユーザードキュメントが参照される
- 分析結果: diagnoses コレクションに適切に保存される

## 注意事項
- 現在のシステムではFirestoreへの直接書き込みはクライアントサイドから行われる
- Cloudflare Workers環境ではFirestore Admin SDKが使用できないため、API経由でのデータ操作が必要
- セキュリティルールを適切に設定することが重要