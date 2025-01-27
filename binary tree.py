class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None


class BinaryTree:
    def __init__(self):
        self.root = None

    def create_tree(self, key):
        self.root = Node(key)
        print(f"Tree created with root key: {key}")

    def insert_left(self, parent_key, key):
        parent = self.search(self.root, parent_key)
        if parent:
            if parent.left is None:
                parent.left = Node(key)
                print(f"Inserted {key} to the left of {parent_key}")
            else:
                print(f"Left child of {parent_key} already exists.")
        else:
            print(f"Parent node {parent_key} not found.")

    def insert_right(self, parent_key, key):
        parent = self.search(self.root, parent_key)
        if parent:
            if parent.right is None:
                parent.right = Node(key)
                print(f"Inserted {key} to the right of {parent_key}")
            else:
                print(f"Right child of {parent_key} already exists.")
        else:
            print(f"Parent node {parent_key} not found.")

    def delete(self, key):
        self.root = self._delete_recursively(self.root, key)

    def _delete_recursively(self, node, key):
        if node is None:
            return None

        if key < node.key:
            node.left = self._delete_recursively(node.left, key)
        elif key > node.key:
            node.right = self._delete_recursively(node.right, key)
        else:
            # Node with one child or no child
            if node.left is None:
                temp = node.right
                node = None
                return temp
            elif node.right is None:
                temp = node.left
                node = None
                return temp

            # Node with two children: Get the inorder successor
            temp = self._min_value_node(node.right)
            node.key = temp.key
            node.right = self._delete_recursively(node.right, temp.key)
        return node

    def _min_value_node(self, node):
        current = node
        while current.left is not None:
            current = current.left
        return current

    def search(self, node, key):
        if node is None or node.key == key:
            return node
        if key < node.key:
            return self.search(node.left, key)
        return self.search(node.right, key)

    def traverse_in_order(self, node):
        if node:
            self.traverse_in_order(node.left)
            print(node.key, end=' ')
            self.traverse_in_order(node.right)

    def traverse_pre_order(self, node):
        if node:
            print(node.key, end=' ')
            self.traverse_pre_order(node.left)
            self.traverse_pre_order(node.right)

    def traverse_post_order(self, node):
        if node:
            self.traverse_post_order(node.left)
            self.traverse_post_order(node.right)
            print(node.key, end=' ')


# Example usage
if __name__ == "__main__":
    tree = BinaryTree()
    root_key = input("Enter root key (char/float): ")
    try:
        root_key = float(root_key) if '.' in root_key else root_key
    except ValueError:
        pass
    tree.create_tree(root_key)

    while True:
        print("\nOptions:")
        print("1. Insert Left")
        print("2. Insert Right")
        print("3. Delete")
        print("4. Traverse (In-order)")
        print("5. Traverse (Pre-order)")
        print("6. Traverse (Post-order)")
        print("7. Search")
        print("8. Exit")
        choice = int(input("Enter your choice: "))

        if choice == 1:
            parent_key = input("Enter parent key: ")
            try:
                parent_key = float(
                    parent_key) if '.' in parent_key else parent_key
            except ValueError:
                pass
            key = input("Enter key to insert (char/float): ")
            try:
                key = float(key) if '.' in key else key
            except ValueError:
                pass
            tree.insert_left(parent_key, key)
        elif choice == 2:
            parent_key = input("Enter parent key: ")
            try:
                parent_key = float(
                    parent_key) if '.' in parent_key else parent_key
            except ValueError:
                pass
            key = input("Enter key to insert (char/float): ")
            try:
                key = float(key) if '.' in key else key
            except ValueError:
                pass
            tree.insert_right(parent_key, key)
        elif choice == 3:
            key = input("Enter key to delete (char/float): ")
            try:
                key = float(key) if '.' in key else key
            except ValueError:
                pass
            tree.delete(key)
        elif choice == 4:
            print("In-order traversal:")
            tree.traverse_in_order(tree.root)
            print()
        elif choice == 5:
            print("Pre-order traversal:")
            tree.traverse_pre_order(tree.root)
            print()
        elif choice == 6:
            print("Post-order traversal:")
            tree.traverse_post_order(tree.root)
            print()
        elif choice == 7:
            key = input("Enter key to search (char/float): ")
            try:
                key = float(key) if '.' in key else key
            except ValueError:
                pass
            result = tree.search(tree.root, key)
            if result:
                print(f"Node {key} found.")
            else:
                print(f"Node {key} not found.")
        elif choice == 8:
            print("Exiting program.")
            break
        else:
            print("Invalid choice. Please try again.")
