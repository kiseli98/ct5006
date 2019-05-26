<?php
	include ( "db_connection.php" );

	class Functions {
		
		private $db;
		
		function __construct( $db )
		{
			
			$this->_db = $db;
									
		}


////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////CATEGORIES////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

		public function fetchAll() {
			
			try {

				$query = $this->_db->query( "SELECT * FROM markers ORDER BY id DESC" );
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}


		public function fetchCategory($catId) {
			
			try {

				$query = $this->_db->prepare( "SELECT * FROM categories WHERE categoryId = :catId");

				$query->bindParam( ":catId", $catId, PDO::PARAM_INT );

				$query->execute();
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}

		public function checkCategory($catName) {
			
			try {

				$query = $this->_db->prepare( "SELECT * FROM categories WHERE categoryName = :catName");

				$query->bindParam( ":catName", $catName, PDO::PARAM_INT );

				$query->execute();
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}


		public function adminAddCategory($catName) {
			
			try {

				$query = $this->_db->prepare( "INSERT INTO categories (categoryName) VALUES (:catName)");

				$query->bindParam( ":catName", $catName, PDO::PARAM_INT );

				$query->execute();
				
				return 0;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

				return -1;

			}
			
		}

		public function adminDeleteCategory($id) {
			
			try {

				$query = $this->_db->prepare( "DELETE FROM categories WHERE categoryID = :id");

				$query->bindParam( ":id", $id, PDO::PARAM_INT );

				$query->execute();
				
				return 0;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

				return -1;

			}
			
		}




		public function adminEditCategory($id, $catName) {
			
			try {

				$query = $this->_db->prepare( "UPDATE categories SET categoryName = :catName WHERE categoryID = :id");

				$query->bindParam( ":catName", $catName, PDO::PARAM_STR );
				$query->bindParam( ":id", $id, PDO::PARAM_INT );

				$query->execute();
				
				return 0;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

				return -1;

			}
			
		}





////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////POSTS/////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////



		public function fetchAllPosts() {
			
			try {

				$query = $this->_db->query( "SELECT * FROM posts ORDER BY postID DESC" );
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}

		public function fetchAllPublishPosts() {
			
			try {

				$query = $this->_db->query( "SELECT * FROM posts WHERE postStatus = 'publish' ORDER BY postID DESC" );
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}


		public function fetchAllPublishCatPosts($catName) {
			
			try {

				$query = $this->_db->prepare( "SELECT * FROM posts WHERE postStatus = 'publish' AND postCategory = :catName ORDER BY postID DESC" );

				$query->bindParam( ":catName", $catName, PDO::PARAM_STR );

				$query->execute();
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}



		public function fetchAllAuthorPosts($username) {
			
			try {

				$query = $this->_db->prepare( "SELECT * FROM posts WHERE postAuthorUsername = :username ORDER BY postID DESC" );

				$query->bindParam( ":username", $username, PDO::PARAM_STR );

				$query->execute();
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}




		public function fetchRelatedPosts($title, $tags , $category) {
			$sameTitle = $title;
			
			try {

				$query = $this->_db->prepare( "SELECT * FROM posts WHERE postStatus = 'publish' AND postTitle <> :sameTitle AND ((postTitle LIKE :title) OR (postCategory LIKE :category)  OR (postTags LIKE :tags)) ORDER BY postID DESC LIMIT 3" );

				$title = "%" . $title . "%";

				$tags = "%" . $tags . "%";

				$category = "%" . $category . "%";

				$query->bindParam( ":sameTitle", $sameTitle, PDO::PARAM_STR );

				$query->bindParam( ":title", $title, PDO::PARAM_STR );
				$query->bindParam( ":tags", $tags, PDO::PARAM_STR );
				$query->bindParam( ":category", $category, PDO::PARAM_STR );

				$query->execute();

				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}




		public function fetchPost($postId) {
			
			try {

				$query = $this->_db->prepare( "SELECT * FROM posts WHERE postID = :postId" );

				$query->bindParam( ":postId", $postId, PDO::PARAM_INT );

				$query->execute();

				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}



		public function fetchAuthorPost($postId, $username) {
			
			try {

				$query = $this->_db->prepare( "SELECT * FROM posts WHERE postID = :postId AND postUsername = :username");

				$query->bindParam( ":postId", $postId, PDO::PARAM_INT );

				$query->bindParam( ":username", $username, PDO::PARAM_STR );
				$query->execute();

				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}


		public function fetchPublishPost($postId) {
			
			try {

				$query = $this->_db->prepare( "SELECT * FROM posts WHERE postStatus = 'publish' AND postID = :postId" );

				$query->bindParam( ":postId", $postId, PDO::PARAM_INT );

				$query->execute();

				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}



		public function adminDeletePost($delId) {
			
			try {

				$query = $this->_db->prepare( "DELETE FROM posts WHERE postID = :delId" );

				$query->bindParam( ":delId", $delId, PDO::PARAM_INT );

				$query->execute();
				
				return 0;

			} catch ( PDOException $e ) {

				echo $e->getMessage();
				return -1;

			}
		}



		public function adminChangePostStatus($id, $status) {
			
			try {

				$query = $this->_db->prepare( "UPDATE posts SET postStatus = :status WHERE postID = :id" );

				$query->bindParam( ":id", $id, PDO::PARAM_INT );

				$query->bindParam( ":status", $status, PDO::PARAM_STR );

				$query->execute();
				
				return 0;

			} catch ( PDOException $e ) {

				echo $e->getMessage();
				return -1;

			}
			
		}
			



		public function countCatPosts($catName) {
			
			try {

				$query = $this->_db->prepare( "SELECT COUNT(postID) FROM posts WHERE postCategory = :catName" );

				$query->bindParam( ":catName", $catName, PDO::PARAM_STR );

				$query->execute();

				$count = $query->fetchColumn();
				
				return $count;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}


		public function searchLimitedNumOfPosts($numberOfPostsPerPage, $postsStartFrom, $search) {
			
			try {

				$query = $this->_db->prepare( "SELECT * FROM posts WHERE postStatus = 'publish' AND ((postTitle LIKE :search) OR (postTags LIKE :search) OR (postData LIKE :search)) ORDER BY postID DESC LIMIT :postsStartFrom, :numberOfPostsPerPage" );

				$search = "%" . $search . "%";

				$query->bindParam( ":search", $search, PDO::PARAM_STR );

				$query->bindParam( ":numberOfPostsPerPage", $numberOfPostsPerPage, PDO::PARAM_INT );
				$query->bindParam( ":postsStartFrom", $postsStartFrom, PDO::PARAM_INT );

				$query->execute();
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}


		public function searchPosts($search) {
			
			try {

				$query = $this->_db->prepare( "SELECT * FROM posts WHERE postStatus = 'publish' AND ((postTitle LIKE :search) OR (postTags LIKE :search) OR (postData LIKE :search)) ORDER BY postID DESC" );

				$search = "%" . $search . "%";

				$query->bindParam( ":search", $search, PDO::PARAM_STR );

				$query->execute();
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}


		public function fetchLimitedNumOfGenericPosts($numberOfPostsPerPage, $postsStartFrom) {
			
			try {

				$query = $this->_db->prepare( "SELECT * FROM posts WHERE postStatus = 'publish' ORDER BY postID DESC LIMIT :postsStartFrom, :numberOfPostsPerPage");

				$query->bindParam( ":numberOfPostsPerPage", $numberOfPostsPerPage, PDO::PARAM_INT );
				$query->bindParam( ":postsStartFrom", $postsStartFrom, PDO::PARAM_INT );

				$query->execute();
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}


		public function fetchLimitedNumOfCatPosts($numberOfPostsPerPage, $postsStartFrom, $catName) {
			
			try {

				$query = $this->_db->prepare( "SELECT * FROM posts WHERE postStatus = 'publish' AND postCategory = :catName ORDER BY postID DESC LIMIT :postsStartFrom, :numberOfPostsPerPage");

				$query->bindParam( ":catName", $catName, PDO::PARAM_STR );
				$query->bindParam( ":numberOfPostsPerPage", $numberOfPostsPerPage, PDO::PARAM_INT );
				$query->bindParam( ":postsStartFrom", $postsStartFrom, PDO::PARAM_INT );

				$query->execute();
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}

		public function fetch5LatestPosts() {
			
			try {

				$query = $this->_db->query( "SELECT * FROM posts WHERE postStatus = 'publish' ORDER BY postID DESC LIMIT 5" );
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}


		public function fetch5PopularPosts() {
			
			try {

				$query = $this->_db->query( "SELECT * FROM posts WHERE postStatus = 'publish' ORDER BY postViews DESC LIMIT 5" );
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}




		public function updatePost($postDate, $postTitle, $postAuthorUsername, $postData, $postImage, $postCategory, $postTags, $postStatus, $id){

			try {

					//insert into database
					$query = $this->_db->prepare( "UPDATE posts SET postDate = :postDate , postTitle = :postTitle, postAuthorUsername = :postAuthorUsername, postImage = :postImage, postCategory = :postCategory, postTags = :postTags, postData = :postData, postStatus = :postStatus WHERE postID = :id" );


					$query->bindParam( ":postDate", $postDate, PDO::PARAM_STR );	
					$query->bindParam( ":postTitle", $postTitle, PDO::PARAM_STR );
					$query->bindParam( ":postAuthorUsername", $postAuthorUsername, PDO::PARAM_STR );
					$query->bindParam( ":postImage", $postImage, PDO::PARAM_STR );
					$query->bindParam( ":postCategory", $postCategory, PDO::PARAM_STR );
					$query->bindParam( ":postTags", $postTags, PDO::PARAM_STR );
					$query->bindParam( ":postData", $postData, PDO::PARAM_STR );
					$query->bindParam( ":postStatus", $postStatus, PDO::PARAM_STR );
					$query->bindParam( ":id", $id, PDO::PARAM_INT );

					$query->execute();

					return 0;

				} catch( PDOException $e ) {

					echo $e->getMessage();

					return -1;

				}

		}




		public function insertPost($postDate, $postTitle, $postAuthorUsername, $postData, $postImage, $postCategory, $postTags, $postStatus){

			try {

					//insert into database
					$query = $this->_db->prepare( "INSERT INTO posts ( postDate, postTitle, postAuthorUsername, postImage, postCategory, postTags, postData, postStatus ) VALUES ( :postDate, :postTitle, :postAuthorUsername, :postImage, :postCategory, :postTags, :postData, :postStatus )" );


					$query->bindParam( ":postDate", $postDate, PDO::PARAM_STR );	
					$query->bindParam( ":postTitle", $postTitle, PDO::PARAM_STR );
					$query->bindParam( ":postAuthorUsername", $postAuthorUsername, PDO::PARAM_STR );
					$query->bindParam( ":postImage", $postImage, PDO::PARAM_STR );
					$query->bindParam( ":postCategory", $postCategory, PDO::PARAM_STR );
					$query->bindParam( ":postTags", $postTags, PDO::PARAM_STR );
					$query->bindParam( ":postData", $postData, PDO::PARAM_STR );
					$query->bindParam( ":postStatus", $postStatus, PDO::PARAM_STR );

					$query->execute();

					return 0;

				} catch( PDOException $e ) {

					echo $e->getMessage();

					return -1;

				}

		}


	



////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////COMMENTS//////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

		public function fetchPostComments($postId) {
			
			try {

				$query = $this->_db->prepare( "SELECT * FROM comments WHERE commentStatus = 'approve' AND commentPostID = :postId ORDER BY commentID" );

				$query->bindParam( ":postId", $postId, PDO::PARAM_INT );

				$query->execute();
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}



		public function fetchAllComments() {
			
			try {

				$query = $this->_db->query( "SELECT * FROM comments ORDER BY commentID DESC" );
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}



		public function getPendingComments() {
			
			try {

				$query = $this->_db->query( "SELECT * FROM comments WHERE commentStatus = 'pending'" );
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}


		public function adminDeleteComment($delId) {
			
			try {

				$query = $this->_db->prepare( "DELETE FROM comments WHERE commentID = :delId" );

				$query->bindParam( ":delId", $delId, PDO::PARAM_INT );

				$query->execute();
				
				return 0;

			} catch ( PDOException $e ) {

				echo $e->getMessage();
				return -1;

			}
			
		}



		public function adminCheckComment($id) {
			
			try {

				$query = $this->_db->prepare( "SELECT * FROM comments WHERE commentID = :id" );

				$query->bindParam( ":id", $id, PDO::PARAM_INT );

				$query->execute();
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}



		public function adminChangeCommentStatus($id, $status) {
			
			try {

				$query = $this->_db->prepare( "UPDATE comments SET commentStatus = :status WHERE commentID = :id" );

				$query->bindParam( ":id", $id, PDO::PARAM_INT );

				$query->bindParam( ":status", $status, PDO::PARAM_STR );

				$query->execute();
				
				return 0;

			} catch ( PDOException $e ) {

				echo $e->getMessage();
				return -1;

			}
			
		}



		public function insertComment($commentDate, $commentSubmitName, $commentSubmitEmail, $commentImage, $commentSubmitComment, $commentPostID, $commentStatus){

			try {

					//insert into database
					$query = $this->_db->prepare( "INSERT INTO comments ( commentDate, commentName, commentEmail, commentImage, commentText, commentPostID, commentStatus ) VALUES ( :commentDate, :commentSubmitName, :commentSubmitEmail, :commentImage, :commentSubmitComment, :commentPostID, :commentStatus )" );


					$query->bindParam( ":commentDate", $commentDate, PDO::PARAM_STR );	
					$query->bindParam( ":commentSubmitName", $commentSubmitName, PDO::PARAM_STR );
					$query->bindParam( ":commentSubmitEmail", $commentSubmitEmail, PDO::PARAM_STR );
					$query->bindParam( ":commentSubmitComment", $commentSubmitComment, PDO::PARAM_STR );
					$query->bindParam( ":commentImage", $commentImage, PDO::PARAM_STR );
					$query->bindParam( ":commentStatus", $commentStatus, PDO::PARAM_STR );
					$query->bindParam( ":commentPostID", $commentPostID, PDO::PARAM_INT );

					$query->execute();

					return 0;

				} catch( PDOException $e ) {

					echo $e->getMessage();

					return -1;

				}

		}


		public function viewsCounter($postId) {	
			
			try {

				$query = $this->_db->prepare( "UPDATE posts SET postViews = postViews + 1 WHERE postID = :postId" );

				$query->bindParam( ":postId", $postId, PDO::PARAM_INT );

				$query->execute();
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}





////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////USERS//////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

		public function adminFetchUsers() {
			
			try {

				$query = $this->_db->query( "SELECT * FROM users ORDER BY userID DESC" );
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}



		public function adminFetch5RecentUsers() {
			
			try {

				$query = $this->_db->query( "SELECT * FROM users ORDER BY userID DESC LIMIT 5" );
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}



		public function adminAddUser($userDate, $firstName, $lastName, $username, $email, $image, $password, $role){

			try {

					//insert into database
					$query = $this->_db->prepare( "INSERT INTO users ( userID, userDate, userFirstName, userLastName, username, userEmail, userImage, userPassword, userRole) VALUES ( NULL, :userDate, :firstName, :lastName, :username, :email, :image, :password, :userRole )" );


					$query->bindParam( ":userDate", $userDate, PDO::PARAM_STR );	
					$query->bindParam( ":firstName", $firstName, PDO::PARAM_STR );
					$query->bindParam( ":lastName", $lastName, PDO::PARAM_STR );
					$query->bindParam( ":username", $username, PDO::PARAM_STR );
					$query->bindParam( ":image", $image, PDO::PARAM_STR );
					$query->bindParam( ":email", $email, PDO::PARAM_STR );
					$query->bindParam( ":password", $password, PDO::PARAM_STR );
					$query->bindParam( ":userRole", $role, PDO::PARAM_STR );

					$query->execute();

					return $query;

				} catch( PDOException $e ) {

					echo $e->getMessage();

				}

		}


		public function adminFetchUser($id) {
			
			try {

				$query = $this->_db->prepare( "SELECT * FROM users WHERE userID = :id" );

				$query->bindParam( ":id", $id, PDO::PARAM_INT );

				$query->execute();
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}



		public function adminCheckUser($username, $email) {
			
			try {

				$query = $this->_db->prepare( "SELECT * FROM users WHERE username = :username OR userEmail = :email ORDER BY userID DESC" );

				$query->bindParam( ":username", $username, PDO::PARAM_STR );

				$query->bindParam( ":email", $email, PDO::PARAM_STR );

				$query->execute();
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}

		public function adminGetSalt() {
			
			try {

				$query = $this->_db->query( "SELECT * FROM users ORDER BY userID DESC LIMIT 1" );
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}





		public function adminDeleteUser($delId) {
			
			try {

				$query = $this->_db->prepare( "DELETE FROM users WHERE userID = :delId" );

				$query->bindParam( ":delId", $delId, PDO::PARAM_INT );

				$query->execute();
				
				return 0;

			} catch ( PDOException $e ) {

				echo $e->getMessage();
				return -1;

			}
			
		}


		
		public function adminCheckImage() {
			
			try {

				$query = $this->_db->query( "SELECT * FROM users ORDER BY userID DESC LIMIT 1" );
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}



		public function adminUpdateUser($id, $firstName, $lastName, $image, $password, $role, $details) {
			
			try {

				$query = $this->_db->prepare( "UPDATE users SET userFirstName = :firstName, userLastName = :lastName, userImage = :image, userPassword = :password, userRole = :role, userDetails = :details WHERE userID = :id" );

				$query->bindParam( ":id", $id, PDO::PARAM_INT );

				$query->bindParam( ":firstName", $firstName, PDO::PARAM_STR );
				$query->bindParam( ":lastName", $lastName, PDO::PARAM_STR );
				$query->bindParam( ":image", $image, PDO::PARAM_STR );
				$query->bindParam( ":password", $password, PDO::PARAM_STR );
				$query->bindParam( ":role", $role, PDO::PARAM_STR );
				$query->bindParam( ":details", $details, PDO::PARAM_STR );

				$query->execute();
				
				return 0;

			} catch ( PDOException $e ) {
				echo $e->getMessage();
				return -1;
			}
			
		}


		public function adminChangeUserRole($id, $role) {
			
			try {

				$query = $this->_db->prepare( "UPDATE users SET userRole = :role WHERE userID = :id" );

				$query->bindParam( ":id", $id, PDO::PARAM_INT );

				$query->bindParam( ":role", $role, PDO::PARAM_STR );

				$query->execute();
				
				return 0;

			} catch ( PDOException $e ) {

				echo $e->getMessage();
				return -1;

			}
			
		}



////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////MEDIA//////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

		public function insertMedia($image){

		try {

				//insert into database
				$query = $this->_db->prepare( "INSERT INTO media ( mediaImage ) VALUES ( :image )" );


				$query->bindParam( ":image", $image, PDO::PARAM_STR );	

				$query->execute();

				return 0;

			} catch( PDOException $e ) {

				echo $e->getMessage();

				return -1;

			}

		}



		public function fetchMedia() {
			
			try {

				$query = $this->_db->query( "SELECT * FROM media ORDER BY mediaID DESC" );
				
				return $query;

			} catch ( PDOException $e ) {

				echo $e->getMessage();

			}
			
		}



	}



////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////OTHER/////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

function trim_text($input, $length, $ellipses, $strip_html) {
    //strip tags
    if ($strip_html) {
        $input = strip_tags($input);
    }
  
 
    if (strlen($input) <= $length) {
        return $input;
    }
  
    //find last space within length
    $last_space = strrpos(substr($input, 0, $length), ' ');
    $trimmed_text = substr($input, 0, $last_space);
  
    //add ellipses (...)
    if ($ellipses) {
        $trimmed_text .= '...';
    }
  
    return $trimmed_text;
}

?>