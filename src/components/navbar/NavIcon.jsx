const NavIcon = ({ href, label, Icon, onClick }) => (
  <a href={href} onClick={onClick} aria-label={label}>
    <div className="p-3 rounded-full border border-gray-200 hover:border-orange-500 hover:bg-orange-100 transition-all duration-300 transform hover:scale-110">
      <Icon className="w-6 h-6 stroke-gray-300 hover:stroke-orange-600 transition-colors duration-300" />
    </div>
  </a>
);

export default NavIcon;