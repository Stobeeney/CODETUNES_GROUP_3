from flask import Flask, render_template, request, jsonify
from queue_link_list import Queue
from input_restricted_deque import InputRestrictedDeque
from output_restricted_deque import OutputRestrictedDeque
from stack import infix_to_postfix
from graph import create_metro_graph


app = Flask(__name__)


# INITIALIZATIONS

linked_list_data = []

postfix_steps = []

queue = Queue()
inputrestricted = InputRestrictedDeque()
outputrestricted = OutputRestrictedDeque()

# LOGIN


@app.route('/')
def login():
    return render_template('login.html')


# HOMEPAGE

@app.route('/homepage')
def homepage():
    return render_template('homepage.html')


@app.route('/artist_homepage')
def artist_homepage():
    return render_template('artist_homepage.html')


# PROFILES

@app.route('/daniel')
def daniel():
    return render_template('daniel.html')


@app.route('/april')
def april():
    return render_template('april.html')


@app.route('/celine')
def celine():
    return render_template('celine.html')


@app.route('/jamaica')
def jamaica():
    return render_template('jamaica.html')


@app.route('/godwin')
def godwin():
    return render_template('godwin.html')


@app.route('/jester')
def jester():
    return render_template('jester.html')


@app.route('/glenn')
def glenn():
    return render_template('glenn.html')


# LINKED LIST

@app.route('/linked_list', methods=['GET', 'POST'])
def linked_list():
    message = None
    if request.method == 'POST':
        action = request.form.get('action')
        value = request.form.get('value')

        if action == 'insert_beginning':
            if value:
                linked_list_data.insert(0, value)
                message = f'Inserted <b>{value}</b> at the beginning.'
            else:
                message = "Please enter an element to insert."

        elif action == 'insert_end':
            if value:
                linked_list_data.append(value)
                message = f'Inserted <b>{value}</b> at the end.'
            else:
                message = "Please enter an element to insert."

        elif action == 'delete_beginning':
            if linked_list_data:
                removed = linked_list_data.pop(0)
                message = f'Removed <b>{removed}</b> from the beginning.'
            else:
                message = "No elements in the list to remove."

        elif action == 'delete_end':
            if linked_list_data:
                removed = linked_list_data.pop()
                message = f'Removed <b>{removed}</b> from the end.'
            else:
                message = "No elements in the list to remove."

        elif action == 'delete_at':
            if value.isdigit():
                index = int(value)
                if 0 <= index < len(linked_list_data):
                    removed = linked_list_data.pop(index)
                    message = f'Removed <b>{
                        removed}</b> at index <b>{index}</b>.'
                else:
                    message = "Invalid index. Please enter a valid index to remove."
            else:
                message = "Please enter an index to remove."

        elif action == 'search':
            if value:
                if value in linked_list_data:
                    index = linked_list_data.index(value)
                    message = f'<b>{
                        value}</b> found at index <b>{index}</b> in the list.'
                else:
                    message = f'<b>{value}</b> not found in the list.'
            else:
                message = "Please enter an element to search."

    return render_template('linked_list.html', linked_list=linked_list_data, message=message)


# STACK

@app.route("/stack", methods=["GET", "POST"])
def stack():
    global postfix_steps
    output = None
    message = None
    infix_expression = None

    if request.method == "POST":
        action = request.form.get("action")

        if action == "push":
            infix_expression = request.form.get("infix", "").strip()
            if infix_expression:
                postfix_steps = infix_to_postfix(infix_expression)
                output = "".join(postfix_steps[-1]) if postfix_steps else None
                message = "Conversion successful!"
            else:
                message = "Please enter a valid infix expression."
        elif action == "clear":

            postfix_steps = []
            output = None
            message = "Stack cleared."

    return render_template("stack.html", postfix_steps=postfix_steps, output=output, message=message, infix_expression=infix_expression)


# QUEUE

@app.route('/overall_choose')
def overall_choose():
    return render_template('overall_choose.html')


@app.route('/deque_choose')
def deque_choose():
    return render_template('deque_choose.html')


@app.route('/queue', methods=['GET', 'POST'])
def queue_operations():

    message = None

    if request.method == 'POST':
        action = request.form['action']
        value = request.form.get('value', '').strip()

        if action == 'enqueue':
            if value:
                queue.enqueue(value)
                message = f'<b>{value}</b> enqueued.'
            else:
                message = 'Please provide a value to enqueue.'
        elif action == 'dequeue':
            dequeued_value = queue.dequeue()
            if dequeued_value:
                message = f'<b>{dequeued_value}</b> dequeued.'
            else:
                message = 'Queue is empty. Nothing to dequeue.'

    return render_template('queue.html', queue=list(queue), message=message)


@app.route('/input_restricted_deque', methods=['GET', 'POST'])
def input_restricted_deque_operations():
    message = None

    if request.method == 'POST':
        action = request.form.get('action')
        value = request.form.get('value', '').strip()

        if action == 'enqueue_at_end':
            if value:
                inputrestricted.enqueue_at_end(value)
                message = f'<b>{value}</b> enqueued.'
            else:
                message = 'Please provide a value to enqueue.'

        elif action == 'dequeue_at_beginning':
            dequeued_head_value = inputrestricted.dequeue_at_beginning()
            if dequeued_head_value:
                message = f'<b>{dequeued_head_value}</b> dequeued.'
            else:
                message = 'Queue is empty. Nothing to dequeue.'

        elif action == 'dequeue_at_end':
            dequeued_tail_value = inputrestricted.dequeue_at_end()
            if dequeued_tail_value:
                message = f'<b>{dequeued_tail_value}</b> dequeued.'
            else:
                message = 'Queue is empty. Nothing to dequeue.'

    return render_template('input_deque.html', inputrestricted=list(inputrestricted), message=message)


@app.route('/output_restricted_deque', methods=['GET', 'POST'])
def output_restricted_deque_operations():
    message = None

    if request.method == 'POST':
        action = request.form.get('action')
        value = request.form.get('value', '').strip()

        if action == 'enqueue_at_end':
            if value:
                outputrestricted.enqueue_at_end(value)
                message = f'<b>{value}</b> enqueued.'
            else:
                message = 'Please provide a value to enqueue.'

        elif action == 'enqueue_at_beginning':
            if value:
                outputrestricted.enqueue_at_beginning(value)
                message = f'<b>{value}</b> enqueued.'
            else:
                message = 'Please provide a value to enqueue'

        elif action == 'dequeue_at_beginning':
            dequeued_head_value = outputrestricted.dequeue_at_beginning()
            if dequeued_head_value:
                message = f'<b>{dequeued_head_value}</b> dequeued.'
            else:
                message = 'Queue is empty. Nothing to dequeue.'

    return render_template('output_deque.html', outputrestricted=list(outputrestricted), message=message)


class BinaryTree:
    def __init__(self):
        self.root = None

    def create_tree(self, key):
        self.root = Node(key)

    def insert_left(self, node, key):
        if node is None:
            return Node(key)
        elif node.left is None:
            node.left = Node(key)
        else:
            self.insert_left(node.left, key)
        return node

    def insert_right(self, node, key):
        if node is None:
            return Node(key)
        elif node.right is None:
            node.right = Node(key)
        else:
            self.insert_right(node.right, key)
        return node

    def delete_node(self, node, key):
        if node is None:
            return None
        if node.value == key:
            return None
        node.left = self.delete_node(node.left, key)
        node.right = self.delete_node(node.right, key)
        return node

    def search(self, node, key):
        if node is None:
            return False
        if node.value == key:
            return True
        return self.search(node.left, key) or self.search(node.right, key)

    def traverse(self, node):
        if node is None:
            return []
        return self.traverse(node.left) + [node.value] + self.traverse(node.right)

    # Visualization method displaying root, then levels with left and right nodes
    def visualize_tree(self, node):
        if not node:
            return "Tree is empty."

        levels = []
        self._level_order_traversal(node, 0, levels)
        result = ''
        for level, nodes in enumerate(levels):
            level_nodes = ' -> '.join(str(node) for node in nodes)
            result += f"Level {level}: {level_nodes}\n"
        return result

    def _level_order_traversal(self, node, level, levels):
        if node is None:
            return
        if len(levels) <= level:
            levels.append([])

        levels[level].append(node.value)
        self._level_order_traversal(node.left, level + 1, levels)
        self._level_order_traversal(node.right, level + 1, levels)


class Node:
    def __init__(self, key):
        self.value = key
        self.left = None
        self.right = None


# Initialize the BinaryTree
tree = BinaryTree()


@app.route('/binary_tree', methods=['GET', 'POST'])
def binary_tree():
    message = ""
    tree_visualization = ""

    if request.method == 'POST':
        action = request.form['action']
        value = request.form.get('value')

        if action == 'create_tree' and value:
            tree.create_tree(value)
            message = f"Tree created with root value: {value}"
        elif action == 'insert_left' and value:
            tree.insert_left(tree.root, value)
            message = f"Left child inserted with value: {value}"
        elif action == 'insert_right' and value:
            tree.insert_right(tree.root, value)
            message = f"Right child inserted with value: {value}"
        elif action == 'delete_node' and value:
            tree.delete_node(tree.root, value)
            message = f"Node {value} deleted."
        elif action == 'search' and value:
            found = tree.search(tree.root, value)
            if found:
                message = f"Node {value} found."
            else:
                message = f"Node {value} not found."
        elif action == 'traverse':
            result = tree.traverse(tree.root)
            message = f"Traversal: {' -> '.join(map(str, result))}"
        elif action == 'visualize':
            tree_visualization = tree.visualize_tree(tree.root)

    return render_template('binary_tree.html', tree_visualization=tree_visualization, message=message)


metro_graph = create_metro_graph()


@app.route('/graph')
def graph():
    return render_template('graph.html')


@app.route('/shortest_path', methods=['POST'])
def shortest_path():
    data = request.json
    start = data.get('start')
    end = data.get('end')

    if not start or not end:
        return jsonify({'error': 'Start and end stations are required'}), 400

    # Get full path with all stations
    path, distance = metro_graph.shortest_path(start, end)
    if path is None or distance is None:
        return jsonify({'error': 'No path found between the stations'}), 400

    # Format response with full path details
    response = {
        'path': path,
        'distance': distance,
        'start_station': start,
        'end_station': end,
        'route_details': {
            'full_path': path,
            'station_count': len(path)
        }
    }

    return jsonify(response), 200


@app.route('/bubble_sort')
def bubble_sort():
    return render_template('bubble_sort.html')


@app.route('/selection_sort')
def selection_sort():
    return render_template('selection_sort.html')


@app.route('/insertion_sort')
def insertion_sort():
    return render_template('insertion_sort.html')


@app.route('/merge_sort')
def merge_sort():
    return render_template('merge_sort.html')


@app.route('/quick_sort')
def quick_sort():
    return render_template('quick_sort.html')


if __name__ == '__main__':
    app.run(debug=True)
